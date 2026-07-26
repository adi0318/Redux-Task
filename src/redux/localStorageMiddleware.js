const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const state = store.getState();

  localStorage.setItem("students", JSON.stringify(state.students.students));

  localStorage.setItem("settings", JSON.stringify(state.settings));

  return result;
};

export default localStorageMiddleware;
