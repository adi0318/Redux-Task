import { configureStore } from "@reduxjs/toolkit";

import studentsReducer from "./studentSlice";
import settingsReducer from "./settingSlice";
import localStorageMiddleware from "./localStorageMiddleware";

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    settings: settingsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
