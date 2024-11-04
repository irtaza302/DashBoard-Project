import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProfileFormData } from '../../schemas/profile.schema';
import { API_CONSTANTS } from '../../constants/api.constants';

const baseUrl = process.env.NODE_ENV === 'production' 
  ? API_CONSTANTS.BASE_URL.PRODUCTION 
  : API_CONSTANTS.BASE_URL.DEVELOPMENT;

export const profileApi = createApi({
  reducerPath: 'profileApi',
  tagTypes: ['Profile'],
  baseQuery: fetchBaseQuery({ 
    baseUrl,
    timeout: API_CONSTANTS.TIMEOUT,
    credentials: 'include'
  }),
  endpoints: (builder) => ({
    getProfiles: builder.query<ProfileFormData[], void>({
      query: () => ({
        url: API_CONSTANTS.ENDPOINTS.PROFILES.BASE,
        method: 'GET',
      }),
      transformErrorResponse: (response) => {
        console.error('API Error:', response);
        return response;
      },
      providesTags: ['Profile']
    }),
    
    getProfileById: builder.query<ProfileFormData, string>({
      query: (id) => API_CONSTANTS.ENDPOINTS.PROFILES.BY_ID(id),
      providesTags: (_result, _error, id) => [{ type: 'Profile', id }]
    }),
    
    createProfile: builder.mutation<ProfileFormData, Omit<ProfileFormData, 'id' | '_id'>>({
      query: (profile) => ({
        url: API_CONSTANTS.ENDPOINTS.PROFILES.BASE,
        method: 'POST',
        body: profile
      }),
      invalidatesTags: ['Profile']
    }),
    
    updateProfile: builder.mutation<
      ProfileFormData,
      { id: string; data: Partial<Omit<ProfileFormData, 'id' | '_id'>> }
    >({
      query: ({ id, data }) => ({
        url: API_CONSTANTS.ENDPOINTS.PROFILES.BY_ID(id),
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Profile', id },
        'Profile'
      ]
    }),
    
    deleteProfile: builder.mutation<void, string>({
      query: (id) => ({
        url: API_CONSTANTS.ENDPOINTS.PROFILES.BY_ID(id),
        method: 'DELETE'
      }),
      invalidatesTags: ['Profile']
    })
  })
});

export const {
  useGetProfilesQuery,
  useGetProfileByIdQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation
} = profileApi; 