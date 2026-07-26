import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { clearStudents } from "../redux/studentSlice";
import { updateProfile, setTheme } from "../redux/settingSlice";

const Settings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const students = useSelector((state) => state.students.students);
  const settings = useSelector((state) => state.settings);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [adminName, setAdminName] = useState(settings.adminName);

  useEffect(() => {
    const root = document.documentElement;

    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else if (settings.theme === "light") {
      root.classList.remove("dark");
    } else if (settings.theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (prefersDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [settings.theme]);

  const handleThemeChange = (theme) => {
    dispatch(setTheme(theme));
  };

  const handleSaveProfile = () => {
    if (!adminName.trim()) {
      return;
    }

    dispatch(
      updateProfile({
        adminName: adminName.trim(),
      })
    );

    setIsEditingProfile(false);
  };

  const handleClearStudents = () => {
    dispatch(clearStudents());

    localStorage.removeItem("students");

    setShowDeleteModal(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f8f6] dark:bg-gray-950">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="w-full overflow-y-auto">
        <div className="flex-1 min-w-0">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  System preferences
                </p>

                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Settings
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Manage your StudentHub preferences and data.
                </p>
              </div>

              <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                      Profile
                    </h2>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Manage your administrator information.
                    </p>
                  </div>

                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {!isEditingProfile ? (
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-lg font-medium">
                      {settings.adminName?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {settings.adminName}
                      </p>

                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {settings.role}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Admin Name
                    </label>

                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none text-sm focus:border-gray-400"
                    />

                    <div className="flex justify-end gap-3 mt-4">
                      <button
                        onClick={() => {
                          setAdminName(settings.adminName);
                          setIsEditingProfile(false);
                        }}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </section>

              <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6">
                <div className="mb-6">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                    Appearance
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Customize how StudentHub looks on your device.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleThemeChange("light")}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-colors ${
                      settings.theme === "light"
                        ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Light
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Use the light appearance.
                      </p>
                    </div>

                    {settings.theme === "light" && (
                      <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" />
                    )}
                  </button>

                  <button
                    onClick={() => handleThemeChange("dark")}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-colors ${
                      settings.theme === "dark"
                        ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Dark
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Use the dark appearance.
                      </p>
                    </div>

                    {settings.theme === "dark" && (
                      <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" />
                    )}
                  </button>

                  <button
                    onClick={() => handleThemeChange("system")}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-colors ${
                      settings.theme === "system"
                        ? "border-gray-900 dark:border-white bg-gray-50 dark:bg-gray-800"
                        : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        System
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Follow your device's theme preference.
                      </p>
                    </div>

                    {settings.theme === "system" && (
                      <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white" />
                    )}
                  </button>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6">
                <div className="mb-6">
                  <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                    Student Data
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Manage the student records stored in this application.
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Total Students
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {students.length} student
                      {students.length !== 1 ? "s" : ""} currently registered.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/students")}
                    className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Manage Students
                  </button>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-900 border border-red-100 dark:border-red-900/40 rounded-2xl p-6">
                <div className="mb-6">
                  <h2 className="text-base font-semibold text-red-600">
                    Danger Zone
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    These actions permanently affect your student data.
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Delete all students
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Permanently remove all student records.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowDeleteModal(true)}
                    disabled={students.length === 0}
                    className="shrink-0 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-950/60 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Delete All
                  </button>
                </div>
              </section>
            </div>
          </main>
        </div>

        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowDeleteModal(false)}
            />

            <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-4">
                <span className="text-red-500 text-lg">!</span>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete all students?
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                This will permanently delete all{" "}
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {students.length} students
                </span>{" "}
                from StudentHub. This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={handleClearStudents}
                  className="px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Delete All
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
