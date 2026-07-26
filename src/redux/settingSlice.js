import { createSlice } from "@reduxjs/toolkit";

const loadSettings = () => {
  const savedSettings = localStorage.getItem("settings");

  if (savedSettings) {
    return JSON.parse(savedSettings);
  }

  return {
    adminName: "Admin",
    role: "Administrator",
    theme: "light",
  };
};

const initialState = loadSettings();

const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {
    updateProfile: (state, action) => {
      state.adminName = action.payload.adminName;
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { updateProfile, setTheme } = settingsSlice.actions;

export default settingsSlice.reducer;
