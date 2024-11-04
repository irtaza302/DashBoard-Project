import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProfileFormData } from '../../schemas/profile.schema';

const baseUrl = process.env.NODE_ENV === 'production' 
  ? '/api'
  : 'http://localhost:5000/api';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  tagTypes: ['Profile'],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProfiles: builder.query<ProfileFormData[], void>({
      query: () => 'profiles',
      providesTags: ['Profile']
    }),
    createProfile: builder.mutation<ProfileFormData, Partial<ProfileFormData>>({
      query: (profile) => ({
        url: 'profiles',
        method: 'POST',
        body: profile,
      }),
      invalidatesTags: ['Profile']
    }),
    updateProfile: builder.mutation<
      ProfileFormData, 
      { id: string; profile: Partial<ProfileFormData> }
    >({
      query: ({ id, profile }) => ({
        url: `profiles/${id}`,
        method: 'PUT',
        body: profile,
      }),
      invalidatesTags: ['Profile']
    }),
    deleteProfile: builder.mutation<void, string>({
      query: (id) => ({
        url: `profiles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile']
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileApi; 