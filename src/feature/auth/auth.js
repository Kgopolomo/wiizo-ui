import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "../message";

import authService from "../../app/api/api";

const user = JSON.parse(localStorage.getItem("user"));

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ firstName, email, password }, thunkAPI) => {
    try {
      const response = await authService.signup(firstName, email, password);
      console.log("signup rsp", response);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    console.log(email);
    try {
      const data = await authService.login(email, password);
      return {
        user: data.data,
      };
    } catch (error) {
      console.log("msg err", error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log("msg err 2", message);
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateUserPreferences  = createAsyncThunk(
  "auth/updatePreferences ",

  
  async ( updatedPreferences, thunkAPI) => {
    
    try {
    
      const response = await authService.updatePreferences(updatedPreferences);
      if (response) {
        const user = JSON.parse(localStorage.getItem("user"));
  
          
          let pushNotification = updatedPreferences.pushNotifications;
          let emailNotification = updatedPreferences.emailNotifications;

      
      
          const preferences = {
            ...thunkAPI.getState().auth.user,
            userProfile: {
              ...thunkAPI.getState().auth.user.userProfile,
              pushNotification,
              emailNotification
            },
          };

          thunkAPI.dispatch(updatePreferences(preferences));
     
          return response;
      }
    } catch (error) {
      console.log("rejectWithValue", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/UpdateUser",
  async (
    { firstName, lastName, idNumber, email, cellphoneNumber },
    thunkAPI
  ) => {
    try {
      const response = await authService.updateProfile(
        firstName,
        lastName,
        idNumber,
        email,
        cellphoneNumber
      );

      if (response) {
        // Update local storage
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("UpdateUser  user", user);

        if (user) {
          console.log("ifuser", user);
          user.data.userProfile.firstName = firstName;
          user.data.userProfile.lastName = lastName;
          user.data.userProfile.idNumber = idNumber;
          user.data.userProfile.email = email;
          user.data.userProfile.cellphoneNumber = cellphoneNumber;
        }

        // Update the user in Redux store
        const updatedUser = {
          ...thunkAPI.getState().auth.user,
          userProfile: {
            ...thunkAPI.getState().auth.user.userProfile,
            firstName,
            lastName,
            idNumber,
            email,
            cellphoneNumber,
          },
        };

        thunkAPI.dispatch(updateUserInStore(updatedUser));

        return response;
      }
    } catch (error) {
      console.log("rejectWithValue", error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserInStore: (state, action) => {
      console.log("updateUserInStore", { data: action.payload });
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify({ data: action.payload }));
    },
    updatePreferences: (state, action) =>{
      console.log("updatePreferences slice", { data: action.payload });
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify({ data: action.payload }));
    }
    // ... other reducers ...
  },
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [signup.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

const { reducer, actions } = authSlice;
export const { updateUserInStore, updatePreferences  } = actions;
export default reducer;
