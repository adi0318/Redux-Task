import { Users, UserCheck, UserX, GraduationCap } from "lucide-react";

import { useSelector } from "react-redux";

const DashboardStats = () => {
  const students = useSelector((state) => state.students.students);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const uniqueCourses = new Set(students.map((student) => student.course)).size;

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
    },
    {
      title: "Active Students",
      value: activeStudents,
      icon: UserCheck,
    },
    {
      title: "Inactive Students",
      value: inactiveStudents,
      icon: UserX,
    },
    {
      title: "Courses",
      value: uniqueCourses,
      icon: GraduationCap,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              bg-white
              dark:bg-gray-900

              border
              border-gray-200
              dark:border-gray-800

              rounded-2xl
              p-6
            "
          >
            <div className="flex items-center justify-between">
              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                {stat.title}
              </p>

              <Icon
                size={18}
                className="
                  text-gray-400
                  dark:text-gray-500
                "
              />
            </div>

            {/* Value */}
            <p
              className="
                text-3xl
                font-semibold
                text-gray-900
                dark:text-white
                mt-5
              "
            >
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
