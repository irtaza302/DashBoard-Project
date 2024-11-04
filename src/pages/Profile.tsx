import { useState, useMemo } from 'react';   
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
import { 
  useGetProfilesQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation
} from '../store/api/profileApi';
import { ProfileTable } from '../components/profile/ProfileTable';

const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingProfile, setEditingProfile] = useState<ProfileFormData | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState<ProfileFormData | null>(null);
    const [search, setSearch] = useState('');

    const { data: profiles = [], isLoading } = useGetProfilesQuery();
    const [createProfile] = useCreateProfileMutation();
    const [updateProfile] = useUpdateProfileMutation();
    const [deleteProfile] = useDeleteProfileMutation();

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

            if (editingProfile?._id) {
                await updateProfile({ 
                    id: editingProfile._id, 
                    data: formattedData 
                }).unwrap();
                toast.success('Profile updated successfully');
            } else {
                await createProfile(formattedData).unwrap();
                toast.success('Profile created successfully');
            }
            handleClose();
        } catch (error) {
            console.error('Submission error:', error);
            toast.error(editingProfile ? 
                'Failed to update profile' : 
                'Failed to create profile'
            );
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
        if (!profileToDelete?._id) return;
        
        try {
            await deleteProfile(profileToDelete._id).unwrap();
            toast.success('Profile deleted successfully');
            setDeleteConfirmOpen(false);
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete profile');
        }
    };

    const filteredProfiles = useMemo(() => {
        return profiles.filter(profile => 
            profile.name.toLowerCase().includes(search.toLowerCase()) ||
            profile.email.toLowerCase().includes(search.toLowerCase()) ||
            profile.education.degree.toLowerCase().includes(search.toLowerCase())
        );
    }, [profiles, search]);

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
            <ProfileTable 
                data={filteredProfiles}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                searchQuery={search}
                onSearchChange={setSearch}
            />

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
        </div>
    );
};

export default Profile; 