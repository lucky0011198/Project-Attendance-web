import { createSlice } from "@reduxjs/toolkit";

let currentData = JSON.parse(localStorage.getItem("Subject"));

export const userSlice = createSlice({
  name: "users",
  initialState: {
    value: JSON.parse(localStorage.getItem("Subject")) || [],
    active: JSON.parse(localStorage.getItem("active")) || {
      Batch: "",
      Branch: "",
      Subject: "",
      Type: "",
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
      localStorage.setItem("Subject", JSON.stringify(state.value));
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
      localStorage.setItem(
        "Subject",
        JSON.stringify(
          state.value.filter((user) => user.id !== action.payload.id)
        )
      );
    },
    setActive: (state, action) => {
      state.active = action.payload;
      localStorage.setItem("active", JSON.stringify(state.active));
    },
  },
});

export const { addUser, deleteUser, setActive } = userSlice.actions;
export default userSlice.reducer;
