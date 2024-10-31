import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { profileSchema, type ProfileFormData } from '../schemas/profile.schema';
import { Dialog } from '@headlessui/react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { profileApi } from '../services/api';
import { PROFILE_CONSTANTS } from '../constants/profile.constants';
import { ProfileForm } from '../components/profile/ProfileForm';

export const Profile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profiles, setProfiles] = useState<ProfileFormData[]>([]);
    const [editingProfile, setEditingProfile] = useState<ProfileFormData | null>(null);

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
            expiryDate: new Date(),
            studentCard: '',
            portfolio: '',
            githubLink: ''
        }
    });

    const {
        reset,
        setValue
    } = form;

    const fetchProfiles = async () => {
        try {
            const data = await profileApi.getAll();
            setProfiles(data);
        } catch {
            toast.error(PROFILE_CONSTANTS.TOAST_MESSAGES.FETCH_ERROR);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    const handleEdit = (profile: ProfileFormData) => {
        setEditingProfile(profile);
        Object.entries(profile).forEach(([key, value]) => {
            if (key === 'education' && typeof value === 'object' && value !== null && 'degree' in value) {
                setValue('education.degree', value.degree);
                setValue('education.completionYear', value.completionYear);
            } else if (key === 'expiryDate') {
                const dateValue = value instanceof Date ? value : new Date(value as string);
                setValue(key as keyof ProfileFormData, dateValue.toISOString().split('T')[0]);
            } else {
                setValue(key as keyof ProfileFormData, value);
            }
        });
        setIsOpen(true);
    };

    const onSubmit = async (data: ProfileFormData) => {
        try {
            setIsLoading(true);
            const formattedData = {
                ...data,
                education: {
                    ...data.education,
                    completionYear: Number(data.education.completionYear)
                },
                expiryDate: new Date(data.expiryDate)
            };

            if (editingProfile?.id) {
                await profileApi.update(editingProfile.id, formattedData);
                toast.success(PROFILE_CONSTANTS.TOAST_MESSAGES.UPDATE_SUCCESS);
            } else {
                await profileApi.create(formattedData);
                toast.success(PROFILE_CONSTANTS.TOAST_MESSAGES.SAVE_SUCCESS);
            }

            await fetchProfiles();
            reset();
            setEditingProfile(null);
            setIsOpen(false);
        } catch {
            toast.error(editingProfile ? PROFILE_CONSTANTS.TOAST_MESSAGES.UPDATE_ERROR : PROFILE_CONSTANTS.TOAST_MESSAGES.SAVE_ERROR);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setEditingProfile(null);
        reset();
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Profile Management</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage and update user profiles</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProfile(null);
                        reset();
                        setIsOpen(true);
                    }}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    <span>{PROFILE_CONSTANTS.BUTTON_TEXT.ADD_PROFILE}</span>
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
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
                            {profiles.map((profile, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
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
                                                onClick={async () => {
                                                    try {
                                                        await profileApi.delete(profile.id!);
                                                        toast.success(PROFILE_CONSTANTS.TOAST_MESSAGES.DELETE_SUCCESS);
                                                        fetchProfiles();
                                                    } catch {
                                                        toast.error(PROFILE_CONSTANTS.TOAST_MESSAGES.DELETE_ERROR);
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900 transition-colors duration-150"
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
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
                
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="mx-auto w-full max-w-2xl bg-white rounded-xl shadow-xl">
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
        </div>
    );
}; 