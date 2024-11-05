import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProfileFormData } from '../../schemas/profile.schema';

const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://mandis-irtaza-maliks-projects.vercel.app/api'
  : 'http://localhost:5000/api';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  tagTypes: ['Profile'],
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    credentials: 'omit',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
    timeout: 10000, // 10 second timeout
  }),
  endpoints: (builder) => ({
    getProfiles: builder.query<ProfileFormData[], void>({
      query: () => '/profiles',
      providesTags: ['Profile'],
      extraOptions: {
        maxRetries: 3,
      },
      transformErrorResponse: (response: { status: number, data: any }) => {
        console.error('API Error:', response);
        return response.data?.error || 'Failed to fetch profiles';
      },
    }),
    createProfile: builder.mutation<ProfileFormData, Partial<ProfileFormData>>({
      query: (profile) => ({
        url: '/profiles',
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
        url: `/profiles/${id}`,
        method: 'PUT',
        body: profile,
      }),
      invalidatesTags: ['Profile']
    }),
    deleteProfile: builder.mutation<void, string>({
      query: (id) => ({
        url: `/profiles/${id}`,
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