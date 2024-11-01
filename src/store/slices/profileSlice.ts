import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProfileFormData } from '../../schemas/profile.schema';
import { profileApi } from '../../services/api';

interface ProfileState {
  profiles: ProfileFormData[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profiles: [],
  loading: false,
  error: null,
};

export const fetchProfiles = createAsyncThunk(
  'profile/fetchProfiles',
  async () => {
    const response = await profileApi.getAll();
    return response;
  }
);

export const createProfile = createAsyncThunk(
  'profile/createProfile',
  async (profile: Omit<ProfileFormData, 'id' | '_id'>) => {
    const response = await profileApi.create(profile);
    return response;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ id, data }: { id: string; data: Partial<Omit<ProfileFormData, 'id' | '_id'>> }) => {
    const response = await profileApi.update(id, data);
    return response;
  }
);

export const deleteProfile = createAsyncThunk(
  'profile/deleteProfile',
  async (id: string) => {
    await profileApi.delete(id);
    return id;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
        state.error = null;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch profiles';
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profiles.push(action.payload);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.profiles = state.profiles.filter(profile => profile._id !== action.payload);
      });
  },
});

export default profileSlice.reducer; 