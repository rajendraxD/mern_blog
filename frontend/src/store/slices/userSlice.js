import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../../api/axios";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export const profile = createAsyncThunk("user/profile", async (_, thunkAPI) => {
  try {
    const res = await get("/user/profile");
    return res.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
