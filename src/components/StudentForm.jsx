import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { X } from "lucide-react";

import { addStudent, updateStudent } from "../redux/studentSlice";

const StudentForm = ({ editingStudent, setEditingStudent, onClose }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      course: "",
      year: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (editingStudent) {
      reset({
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
        year: editingStudent.year,
        status: editingStudent.status,
      });
    }
  }, [editingStudent, reset]);

  const onSubmit = (data) => {
    if (editingStudent) {
      const updatedStudent = {
        id: editingStudent.id,
        ...data,
        year: Number(data.year),
      };

      dispatch(updateStudent(updatedStudent));

      setEditingStudent(null);
    } else {
      const newStudent = {
        id: Date.now(),
        ...data,
        year: Number(data.year),
      };

      dispatch(addStudent(newStudent));
    }

    reset();
    onClose();
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    reset();

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {editingStudent ? "Update Student" : "Add New Student"}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {editingStudent
              ? "Update the student's information below."
              : "Add a new student to your community."}
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="
              p-2
              rounded-lg
              text-gray-400
              dark:text-gray-500
              hover:text-gray-900
              dark:hover:text-white
              hover:bg-gray-100
              dark:hover:bg-gray-800
              transition-colors
            "
          ></button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter student name"
            {...register("name", {
              required: "Name is required",
            })}
            className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors ${
              errors.name
                ? "border-red-300 dark:border-red-500 focus:border-red-500"
                : "border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500"
            }`}
          />

          {errors.name && (
            <p className="text-xs text-red-500 mt-1.5">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="student@example.com"
            {...register("email", {
              required: "Email is required",
            })}
            className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors ${
              errors.email
                ? "border-red-300 dark:border-red-500 focus:border-red-500"
                : "border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500"
            }`}
          />

          {errors.email && (
            <p className="text-xs text-red-500 mt-1.5">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Course
            </label>

            <input
              type="text"
              placeholder="e.g. AIML"
              {...register("course", {
                required: "Course is required",
              })}
              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors ${
                errors.course
                  ? "border-red-300 dark:border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500"
              }`}
            />

            {errors.course && (
              <p className="text-xs text-red-500 mt-1.5">
                {errors.course.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Year
            </label>

            <input
              type="number"
              placeholder="1 - 5"
              {...register("year", {
                required: "Year is required",
                min: {
                  value: 1,
                  message: "Minimum year is 1",
                },
                max: {
                  value: 5,
                  message: "Maximum year is 5",
                },
              })}
              className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none transition-colors ${
                errors.year
                  ? "border-red-300 dark:border-red-500 focus:border-red-500"
                  : "border-gray-200 dark:border-gray-700 focus:border-gray-400 dark:focus:border-gray-500"
              }`}
            />

            {errors.year && (
              <p className="text-xs text-red-500 mt-1.5">
                {errors.year.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>

          <select
            {...register("status")}
            className="
              w-full
              px-4
              py-3
              rounded-xl
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-900
              text-sm
              text-gray-900
              dark:text-white
              outline-none
              focus:border-gray-400
              dark:focus:border-gray-500
              transition-colors
            "
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          {editingStudent && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="
                px-4
                py-2.5
                rounded-xl
                text-sm
                font-medium
                text-gray-600
                dark:text-gray-300
                hover:bg-gray-100
                dark:hover:bg-gray-800
                transition-colors
              "
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="
              px-5
              py-2.5
              rounded-xl
              bg-gray-900
              dark:bg-white
              text-white
              dark:text-gray-900
              text-sm
              font-medium
              hover:bg-gray-800
              dark:hover:bg-gray-200
              transition-colors
            "
          >
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
