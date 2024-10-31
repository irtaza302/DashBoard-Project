import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../services/api';
import { ProfileFormData } from '../schemas/profile.schema';

export const useProfiles = () => {
  const queryClient = useQueryClient();

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: profileApi.getAll
  });

  const createProfile = useMutation({
    mutationFn: (data: ProfileFormData) => profileApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profiles'] })
  });

  const updateProfile = useMutation({
    mutationFn: (data: ProfileFormData) => profileApi.update(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profiles'] })
  });

  const deleteProfile = useMutation({
    mutationFn: (id: string) => profileApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profiles'] })
  });

  return {
    profiles,
    isLoading,
    createProfile,
    updateProfile,
    deleteProfile
  };
}; 