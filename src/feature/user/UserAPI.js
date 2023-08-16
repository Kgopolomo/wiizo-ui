import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../app/api/api";
import { setMessage } from "../message";

const initialState = {
  status: "idle",
  error: null,
};

export const updateProfile = createAsyncThunk(
  "user",
  async ({ firstName, lastName, idNumber, email, cellphoneNumber }, thunkAPI) => {
    try {
      const response = await authService.updateProfile(firstName, lastName, idNumber, email, cellphoneNumber);
      thunkAPI.dispatch(setMessage(response.message));
      return response;
    } catch (error) {
      console.log("rejectWithValue",error.response.data)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);s

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        // You can update your state here if needed
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});



const authSlice = createSlice({
  name: "user",
  initialState: {
    user: /* initial user data */,
  },
  reducers: {
    updateUserInStore: (state, action) => {
      state.user = action.payload;
    },
    // ... other reducers ...
  },
});

export const { updateUserInStore } = authSlice.actions;


export default userSlice.reducer;