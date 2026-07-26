import { createSlice } from "@reduxjs/toolkit";

const loadStudents = () => {
  const savedStudents = localStorage.getItem("students");

  if (savedStudents) {
    return JSON.parse(savedStudents);
  }

  return [];
};

const initialState = {
  students: loadStudents(),
};

const studentSlice = createSlice({
  name: "students",
  initialState,

  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },

    updateStudent: (state, action) => {
      const index = state.students.findIndex(
        (student) => student.id === action.payload.id
      );

      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },

    deleteStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },

    clearStudents: (state) => {
      state.students = [];
    },
  },
});

export const { addStudent, updateStudent, deleteStudent, clearStudents } =
  studentSlice.actions;

export default studentSlice.reducer;
