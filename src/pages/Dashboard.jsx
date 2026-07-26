import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import StudentForm from "../components/StudentForm";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);

  const navigate = useNavigate();

  const students = useSelector((state) => state.students.students);

  const adminName = useSelector((state) => state.settings.adminName);

  const recentStudents = [...students].reverse().slice(0, 3);

  return (
    <div
      className="
        flex
        max-h-screen
        bg-[#f8f8f6]
        dark:bg-gray-950
      "
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="w-full overflow-y-auto">
        <div className="flex-1 min-w-0">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

          <main className="p-6 md:p-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <p
                  className="
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                    mb-2
                  "
                >
                  Welcome back
                </p>

                <h1
                  className="
                    text-3xl
                    font-semibold
                    tracking-tight
                    text-gray-900
                    dark:text-white
                  "
                >
                  Good morning, {adminName}.
                </h1>

                <p
                  className="
                    text-gray-500
                    dark:text-gray-400
                    mt-2
                  "
                >
                  Here's a quick overview of your student community.
                </p>
              </div>

              <DashboardStats />

              <div className="mt-8">
                <div className="mb-4">
                  <h2
                    className="
                      text-lg
                      font-semibold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    Quick Actions
                  </h2>

                  <p
                    className="
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                      mt-1
                    "
                  >
                    Manage your student community
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate("/students?add=true")}
                    className="
                      group
                      bg-white
                      dark:bg-gray-900

                      border
                      border-gray-200
                      dark:border-gray-800

                      rounded-2xl
                      p-5
                      text-left

                      hover:border-gray-300
                      dark:hover:border-gray-700

                      hover:bg-gray-50
                      dark:hover:bg-gray-800

                      transition-colors
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-gray-900
                            dark:text-white
                          "
                        >
                          Add New Student
                        </h3>

                        <p
                          className="
                            text-sm
                            text-gray-500
                            dark:text-gray-400
                            mt-1
                          "
                        >
                          Register a new student in your community.
                        </p>
                      </div>

                      <div
                        className="
                          text-gray-400
                          dark:text-gray-500

                          group-hover:text-gray-900
                          dark:group-hover:text-white

                          text-xl
                          transition-colors
                        "
                      >
                        →
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate("/students")}
                    className="
                      group
                      bg-white
                      dark:bg-gray-900

                      border
                      border-gray-200
                      dark:border-gray-800

                      rounded-2xl
                      p-5
                      text-left

                      hover:border-gray-300
                      dark:hover:border-gray-700

                      hover:bg-gray-50
                      dark:hover:bg-gray-800

                      transition-colors
                    "
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className="
                            text-sm
                            font-semibold
                            text-gray-900
                            dark:text-white
                          "
                        >
                          Manage Students
                        </h3>

                        <p
                          className="
                            text-sm
                            text-gray-500
                            dark:text-gray-400
                            mt-1
                          "
                        >
                          View, edit, search, and manage students.
                        </p>
                      </div>

                      <div
                        className="
                          text-gray-400
                          dark:text-gray-500

                          group-hover:text-gray-900
                          dark:group-hover:text-white

                          text-xl
                          transition-colors
                        "
                      >
                        →
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div
                className="
                  mt-8

                  bg-white
                  dark:bg-gray-900

                  border
                  border-gray-200
                  dark:border-gray-800

                  rounded-2xl
                  overflow-hidden
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between

                    px-6
                    py-5

                    border-b
                    border-gray-100
                    dark:border-gray-800
                  "
                >
                  <div>
                    <h2
                      className="
                        font-semibold
                        text-gray-900
                        dark:text-white
                      "
                    >
                      Recent Students
                    </h2>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                        mt-1
                      "
                    >
                      Recently added students
                    </p>
                  </div>

                  <button
                    onClick={() => navigate("/students")}
                    className="
                      text-sm
                      font-medium

                      text-gray-500
                      dark:text-gray-400

                      hover:text-gray-900
                      dark:hover:text-white

                      transition-colors
                    "
                  >
                    View all
                  </button>
                </div>

                <div>
                  {recentStudents.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                      <p
                        className="
                          text-sm
                          text-gray-500
                          dark:text-gray-400
                        "
                      >
                        No students added yet.
                      </p>

                      <p
                        className="
                          text-xs
                          text-gray-400
                          dark:text-gray-500
                          mt-1
                        "
                      >
                        Add your first student to see them here.
                      </p>
                    </div>
                  ) : (
                    recentStudents.map((student) => (
                      <StudentRow key={student.id} student={student} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowAddModal(false)}
            />

            <div
              className="
                relative
                w-full
                max-w-lg
                max-h-[90vh]
                overflow-y-auto

                bg-white
                dark:bg-gray-900

                rounded-2xl
                p-6
                shadow-xl
              "
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="
                  absolute
                  top-5
                  right-5

                  text-gray-400
                  dark:text-gray-500

                  hover:text-gray-900
                  dark:hover:text-white

                  text-xl
                "
              >
                ×
              </button>

              <StudentForm
                editingStudent={editingStudent}
                setEditingStudent={setEditingStudent}
                onClose={() => setShowAddModal(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StudentRow = ({ student }) => {
  return (
    <div
      className="
        px-6
        py-4

        flex
        items-center
        justify-between
        gap-4

        border-b
        border-gray-100
        dark:border-gray-800

        last:border-b-0
      "
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="
            w-10
            h-10
            rounded-full

            bg-gray-100
            dark:bg-gray-800

            flex
            items-center
            justify-center

            text-sm
            font-medium

            text-gray-700
            dark:text-gray-200

            shrink-
          "
        >
          {student.name?.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p
            className="
              text-sm
              font-medium

              text-gray-900
              dark:text-white

              truncate
            "
          >
            {student.name}
          </p>

          <p
            className="
              text-xs

              text-gray-500
              dark:text-gray-400

              truncate
            "
          >
            {student.email}
          </p>
        </div>
      </div>

      <p
        className="
          hidden
          md:block
          text-sm

          text-gray-500
          dark:text-gray-400
        "
      >
        {student.course}
      </p>

      <span
        className={`
          text-xs
          font-medium
          px-2.5
          py-1
          rounded-full

          ${
            student.status === "Active"
              ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400"
              : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
          }
        `}
      >
        {student.status}
      </span>
    </div>
  );
};

export default Dashboard;
