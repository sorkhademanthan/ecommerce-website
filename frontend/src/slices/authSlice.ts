import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define UserInfo type here since it is not exported from '../types'
export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

// Helper function to get user info from localStorage
const userInfoFromStorageString = localStorage.getItem('userInfo');
const userInfoFromStorage = userInfoFromStorageString
  ? (JSON.parse(userInfoFromStorageString) as UserInfo)
  : null;

interface AuthState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};

// Async thunk for user login
export const login = createAsyncThunk<
  UserInfo,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post<UserInfo>(
      '/api/users/login',
      { email, password },
      config
    );
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    // Fix: Ensure error is handled robustly and type-safely
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
    }
    return rejectWithValue('An error occurred');
  }
});

// Async thunk for user registration
export const register = createAsyncThunk<
  UserInfo,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post<UserInfo>(
      '/api/users',
      { name, email, password },
      config
    );
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    // Fix: Ensure error is handled robustly and type-safely
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
    }
    return rejectWithValue('An error occurred');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null; // Fix 2: Clear previous errors on new request
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed'; // Fix 3: Use ?? for nullish coalescing
      })
      // Register cases (Fix 4, 5, 6: These were missing)
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Registration failed';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Update failed';
      });
  },
});

export const updateUserProfile = createAsyncThunk<
  UserInfo,
  Partial<UserInfo & { password?: string }>, // The data we send can be partial
  { rejectValue: string; state: { auth: AuthState } } // We need access to the state
>('auth/updateProfile', async (user, { getState, rejectWithValue }) => {
  try {
    // Get userInfo from the Redux state to access the token
    const { userInfo } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo?.token}`, // Add the token here
      },
    };

    const { data } = await axios.put<UserInfo>(`/api/users/profile`, user, config);

    // Update localStorage with the new user info
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred');
    }
    return rejectWithValue('An error occurred');
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;