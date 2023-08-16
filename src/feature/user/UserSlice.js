import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const UserSlice = createSlice({
    
  name: "updateUser",
  initialState: {
    user: user,
  },
  
  reducers: {
    
    updateUserInStore: (state, action) => {
        console.log("updateUserInStore",state)
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    // ... other reducers ...
  },
});

const { reducer, actions } = UserSlice;
export const { updateUserInStore } = actions;
export default reducer;