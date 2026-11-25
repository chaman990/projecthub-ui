import { api, User } from "@/lib/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    user: User | null
    loading: boolean
    error: string | null
}

const initialState:AuthState = {
    user : null,
    loading: true,
    error: null
}

export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get<User>("/auth/me");
      return data;
    } catch (err: unknown) {
      return rejectWithValue(err instanceof Error ? err.message : "Not authenticated");
    }
  }
);


export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await api.post<User>("/auth/login", credentials);
    return data;
  } catch (err: unknown) {
    return rejectWithValue(err instanceof Error ? err.message : "Login failed");
  }
});

export const registerUser = createAsyncThunk<
  User,
  { full_name: string; email: string; password: string },
  { rejectValue: string }
>("auth/registerUser", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post<User>("/auth/register", payload);
    return data;
  } catch (err: unknown) {
    return rejectWithValue(err instanceof Error ? err.message : "Registration failed");
  }
});
export const logoutUser = createAsyncThunk<void, void>(
  "auth/logoutUser",
  async () => {
    await api.post("/auth/logout").catch(() => {});
  }
);


const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
    builder // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || "Login failed";
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload || "Registration failed";
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
    }
})

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
