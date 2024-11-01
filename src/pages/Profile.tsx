import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { profileSchema, type ProfileFormData } from '../schemas/profile.schema';
import { Dialog } from '@headlessui/react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';;
import { PROFILE_CONSTANTS } from '../constants/profile.constants';
import { ProfileForm } from '../components/profile/ProfileForm';
import { formatDate } from '../utils/date';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProfiles, createProfile, updateProfile, deleteProfile } from '../store/slices/profileSlice';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [editingProfile, setEditingProfile] = useState<ProfileFormData | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState<ProfileFormData | null>(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [pageSize] = useState(10);

    const dispatch = useAppDispatch();
    const { profiles} = useAppSelector(state => state.profile);

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: '',
            email: '',
            contact: '',
            address: '',
            education: {
                degree: '',
                completionYear: new Date().getFullYear()
            },
            expiryDate: formatDate(new Date()),
            studentCard: '',
            portfolio: '',
            githubLink: ''
        },
        mode: 'onChange',
        shouldUnregister: false
    });

    const {
        reset,
    } = form;

    useEffect(() => {
        dispatch(fetchProfiles());
    }, [dispatch]);

    const handleEdit = (profile: ProfileFormData) => {
        setEditingProfile(profile);
        form.reset({
            name: profile.name,
            email: profile.email,
            contact: profile.contact,
            address: profile.address,
            education: {
                degree: profile.education.degree,
                completionYear: profile.education.completionYear
            },
            studentCard: profile.studentCard,
            expiryDate: formatDate(profile.expiryDate),
            portfolio: profile.portfolio || '',
            githubLink: profile.githubLink || ''
        });
        setIsOpen(true);
    };

    const onSubmit = async (data: ProfileFormData) => {
        try {
            setIsLoading(true);
            const formattedData = {
                ...data,
                education: {
                    degree: data.education.degree,
                    completionYear: Number(data.education.completionYear)
                },
                expiryDate: new Date(data.expiryDate).toISOString(),
                portfolio: data.portfolio || '',
                githubLink: data.githubLink || ''
            };

            console.log('Submitting profile:', {
                isEditing: !!editingProfile?._id,
                profileId: editingProfile?._id,
                formData: formattedData
            });

            if (editingProfile?._id) {
                const result = await dispatch(updateProfile({ 
                    id: editingProfile._id, 
                    data: formattedData 
                })).unwrap();
                console.log('Update result:', result);
                toast.success(PROFILE_CONSTANTS.TOAST_MESSAGES.UPDATE_SUCCESS);
            } else {
                const result = await dispatch(createProfile(formattedData)).unwrap();
                console.log('Create result:', result);
                toast.success(PROFILE_CONSTANTS.TOAST_MESSAGES.SAVE_SUCCESS);
            }

            handleClose();
        } catch (error) {
            console.error('Submission error:', error);
            toast.error(editingProfile ? 
                PROFILE_CONSTANTS.TOAST_MESSAGES.UPDATE_ERROR : 
                PROFILE_CONSTANTS.TOAST_MESSAGES.SAVE_ERROR
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setEditingProfile(null);
        form.reset({
            name: '',
            email: '',
            contact: '',
            address: '',
            education: {
                degree: '',
                completionYear: new Date().getFullYear()
            },
            studentCard: '',
            expiryDate: formatDate(new Date()),
            portfolio: '',
            githubLink: ''
        });
    };

    const handleDeleteClick = (profile: ProfileFormData) => {
        setProfileToDelete(profile);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!profileToDelete?._id) {
            console.error('No profile ID found');
            return;
        }
        
        try {
            setIsLoading(true);
            await dispatch(deleteProfile(profileToDelete._id)).unwrap();
            toast.success(PROFILE_CONSTANTS.TOAST_MESSAGES.DELETE_SUCCESS);
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(PROFILE_CONSTANTS.TOAST_MESSAGES.DELETE_ERROR);
        } finally {
            setIsLoading(false);
            setDeleteConfirmOpen(false);
            setProfileToDelete(null);
        }
    };

    const filteredProfiles = useMemo(() => {
        return profiles.filter(profile => 
            profile.name.toLowerCase().includes(search.toLowerCase()) ||
            profile.email.toLowerCase().includes(search.toLowerCase()) ||
            profile.education.degree.toLowerCase().includes(search.toLowerCase())
        );
    }, [profiles, search]);

    const paginatedProfiles = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredProfiles.slice(start, start + pageSize);
    }, [filteredProfiles, page, pageSize]);

    return (
        <div className="p-8 bg-background min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Profile Management</h1>
                    <p className="mt-1 text-sm text-foreground-secondary">
                        Manage and update user profiles
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingProfile(null);
                        reset();
                        setIsOpen(true);
                    }}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    <span>{PROFILE_CONSTANTS.BUTTON_TEXT.ADD_PROFILE}</span>
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-background-secondary rounded-xl shadow-sm border border-foreground/10">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                {Object.values(PROFILE_CONSTANTS.TABLE_HEADERS).map((header, index) => (
                                    <th key={index} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {paginatedProfiles.map((profile) => (
                                <tr key={profile._id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{profile.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{profile.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{profile.contact}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{profile.education.degree}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => handleEdit(profile)}
                                                className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150"
                                            >
                                                <PencilIcon className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(profile)}
                                                className="text-red-600 hover:text-red-900 transition-colors duration-200"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" aria-hidden="true" />
                
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="mx-auto w-full max-w-2xl bg-background-secondary rounded-xl shadow-xl">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title className="text-xl font-semibold text-gray-900">
                                        {editingProfile ? PROFILE_CONSTANTS.DIALOG_TITLES.EDIT : PROFILE_CONSTANTS.DIALOG_TITLES.ADD}
                                    </Dialog.Title>
                                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-500">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <ProfileForm
                                form={form}
                                onSubmit={onSubmit}
                                isLoading={isLoading}
                                onClose={handleClose}
                                isEditing={!!editingProfile}
                            />
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>

            <ConfirmDialog
                isOpen={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Profile"
                message="Are you sure you want to delete this profile? This action cannot be undone."
                isLoading={isLoading}
            />

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search profiles..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                />
            </div>

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {page} of {Math.ceil(filteredProfiles.length / pageSize)}</span>
                <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= Math.ceil(filteredProfiles.length / pageSize)}
                    className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Profile; 