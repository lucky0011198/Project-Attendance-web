import { createSlice } from "@reduxjs/toolkit";

let currentData = JSON.parse(localStorage.getItem("Subject"));

export const userSlice = createSlice({
  name: "users",
  initialState: {
    Template:JSON.parse(localStorage.getItem('Template'))||[],
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
    addTemplate:(state,action)=>{
    state.Template.push(action.payload);
    localStorage.setItem("Template", JSON.stringify(state.Template));
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
    updateData :(state,action)=>{
      state.value.map((i)=>{
        if(i.id===action.payload.id){
          i.Attendance=action.payload.data
          i['classAttendance']=[...i['classAttendance'],action.payload.classAttendance]
        }
      })
      localStorage.setItem("Subject", JSON.stringify(state.value));
    }
  },
});

export const { addUser, deleteUser, setActive,updateData,addTemplate } = userSlice.actions;
export default userSlice.reducer;
