import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../services/api';
import { ProfileFormData } from '../schemas/profile.schema';
import { toast } from 'react-hot-toast';

export const useProfiles = () => {
    const queryClient = useQueryClient();

    const { data: profiles, isLoading, error } = useQuery<ProfileFormData[]>({
        queryKey: ['profiles'],
        queryFn: profileApi.getAll,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const createMutation = useMutation<
        ProfileFormData,
        Error,
        Omit<ProfileFormData, 'id' | '_id'>
    >({
        mutationFn: profileApi.create,
        onSuccess: (createdProfile) => {
            queryClient.setQueryData<ProfileFormData[]>(['profiles'], (old) => 
                old ? [...old, createdProfile] : [createdProfile]
            );
            toast.success('Profile created successfully');
        },
    });

    const updateMutation = useMutation<
        ProfileFormData,
        Error,
        { id: string; data: Partial<Omit<ProfileFormData, 'id' | '_id'>> }
    >({
        mutationFn: ({ id, data }) => profileApi.update(id, data),
        onSuccess: (updatedProfile) => {
            queryClient.setQueryData<ProfileFormData[]>(['profiles'], (old) =>
                old?.map(profile => 
                    profile._id === updatedProfile._id ? updatedProfile : profile
                ) ?? []
            );
            toast.success('Profile updated successfully');
        },
    });

    const deleteMutation = useMutation<
        void,
        Error,
        string
    >({
        mutationFn: profileApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
            toast.success('Profile deleted successfully');
        },
    });

    return {
        profiles,
        isLoading,
        error,
        createProfile: createMutation.mutate,
        updateProfile: updateMutation.mutate,
        deleteProfile: deleteMutation.mutate,
    };
}; 