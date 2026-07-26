import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StudentForm from "../components/StudentForm";

import { deleteStudent } from "../redux/studentSlice";

const Students = () => {
  const students = useSelector((state) => state.students.students);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const closeAddModal = () => {
    setShowAddModal(false);
    setEditingStudent(null);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f8f6] dark:bg-gray-950">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 min-w-0">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Student directory
                </p>

                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Students
                </h1>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Manage all students in your community.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingStudent(null);
                  setShowAddModal(true);
                }}
                className="
                  px-5 py-3
                  rounded-xl
                  bg-gray-900 dark:bg-white
                  text-white dark:text-gray-900
                  text-sm font-medium
                  hover:bg-gray-800
                  dark:hover:bg-gray-200
                  transition-colors
                  shrink-0
                "
              >
                + Add Student
              </button>
            </div>

            <div
              className="
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-800
                rounded-2xl
                overflow-hidden
              "
            >
              <div
                className="
                  px-6 py-4
                  border-b border-gray-100 dark:border-gray-800
                "
              >
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  All Students
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {students.length} students registered
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 text-left">
                      <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Student
                      </th>

                      <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Course
                      </th>

                      <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Year
                      </th>

                      <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                        Status
                      </th>

                      <th className="px-6 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-16 text-center">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No students found.
                          </p>

                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            Add your first student to get started.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      students.map((student) => (
                        <StudentTableRow
                          key={student.id}
                          student={student}
                          onEdit={() => {
                            setEditingStudent(student);
                            setShowAddModal(true);
                          }}
                          onDelete={() => {
                            setStudentToDelete(student);
                          }}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 dark:bg-black/60"
            onClick={closeAddModal}
          />

          <div
            className="
              relative
              w-full
              max-w-lg
              max-h-[90vh]
              overflow-y-auto
              bg-white dark:bg-gray-900
              rounded-2xl
              p-6
              shadow-xl
              border border-transparent dark:border-gray-800
            "
          >
            <button
              onClick={closeAddModal}
              className="
                absolute
                top-5
                right-5
                text-gray-400
                dark:text-gray-500
                hover:text-gray-900
                dark:hover:text-white
                text-xl
                transition-colors
              "
            >
              ×
            </button>

            <StudentForm
              editingStudent={editingStudent}
              setEditingStudent={setEditingStudent}
              onClose={closeAddModal}
            />
          </div>
        </div>
      )}

      {studentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 dark:bg-black/60"
            onClick={() => setStudentToDelete(null)}
          />

          <div
            className="
              relative
              w-full
              max-w-sm
              bg-white dark:bg-gray-900
              rounded-2xl
              p-6
              shadow-xl
              border border-transparent dark:border-gray-800
            "
          >
            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/40 flex items-center justify-center mb-4">
              <span className="text-red-500 text-lg">!</span>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Student?
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {studentToDelete.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setStudentToDelete(null)}
                className="
                  px-4 py-2.5
                  rounded-xl
                  text-sm font-medium
                  text-gray-600 dark:text-gray-300
                  hover:bg-gray-100
                  dark:hover:bg-gray-800
                  transition-colors
                "
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  dispatch(deleteStudent(studentToDelete.id));
                  setStudentToDelete(null);
                }}
                className="
                  px-4 py-2.5
                  rounded-xl
                  bg-red-500
                  text-white
                  text-sm font-medium
                  hover:bg-red-600
                  transition-colors
                "
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StudentTableRow = ({ student, onEdit, onDelete }) => {
  return (
    <tr
      className="
        border-b
        border-gray-100 dark:border-gray-800
        last:border-0
        hover:bg-gray-50
        dark:hover:bg-gray-800/40
        transition-colors
      "
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className="
              w-9 h-9
              rounded-full
              bg-gray-100 dark:bg-gray-800
              flex items-center justify-center
              text-sm font-medium
              text-gray-700 dark:text-gray-200
              shrink-0
            "
          >
            {student.name?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {student.name}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {student.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
        {student.course}
      </td>

      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
        Year {student.year}
      </td>

      <td className="px-6 py-4">
        <span
          className={`
            text-xs
            font-medium
            px-2.5
            py-1
            rounded-full
            ${
              student.status === "Active"
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            }
          `}
        >
          {student.status}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <button
            onClick={onEdit}
            className="
              px-3 py-1.5
              rounded-lg
              text-xs font-medium
              text-gray-600 dark:text-gray-300
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition-colors
            "
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="
              px-3 py-1.5
              rounded-lg
              text-xs font-medium
              text-red-500
              hover:bg-red-50
              dark:hover:bg-red-950/40
              transition-colors
            "
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Students;
