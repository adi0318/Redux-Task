import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BarChart3,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          className="
            fixed inset-0
            z-40
            bg-black/40
            lg:hidden
          "
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static
          inset-y-0 left-0
          z-50
          w-64
          min-h-screen
          flex flex-col

          bg-white dark:bg-gray-950
          border-r border-gray-200 dark:border-gray-800

          transform
          transition-transform
          duration-200

          lg:translate-x-0

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div
          className="
            h-20
            px-6
            flex
            items-center
            justify-between
            border-b
            border-gray-100 dark:border-gray-800
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                w-9 h-9
                rounded-lg
                bg-gray-900 dark:bg-white
                flex
                items-center
                justify-center
              "
            >
              <GraduationCap
                size={20}
                className="text-white dark:text-gray-900"
              />
            </div>

            <div>
              <h1 className="text-base font-semibold text-gray-900 dark:text-white">
                StudentHub
              </h1>

              <p className="text-xs text-gray-400 dark:text-gray-500">
                Management Portal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="
              lg:hidden
              text-gray-400
              dark:text-gray-500
              hover:text-gray-900
              dark:hover:text-white
              transition-colors
            "
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <p
            className="
              px-3
              mb-3
              text-[11px]
              font-semibold
              uppercase
              tracking-wider
              text-gray-400
              dark:text-gray-500
            "
          >
            Workspace
          </p>

          <div className="space-y-1">
            <SidebarItem
              to="/"
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              onClick={onClose}
            />

            <SidebarItem
              to="/students"
              icon={<Users size={18} />}
              label="Students"
              onClick={onClose}
            />
          </div>

          <p
            className="
              px-3
              mt-8
              mb-3
              text-[11px]
              font-semibold
              uppercase
              tracking-wider
              text-gray-400
              dark:text-gray-500
            "
          >
            System
          </p>

          <div className="space-y-1">
            <SidebarItem
              to="/settings"
              icon={<Settings size={18} />}
              label="Settings"
              onClick={onClose}
            />
          </div>
        </nav>

        <div
          className="
            p-4
            border-t
            border-gray-100 dark:border-gray-800
          "
        >
          <div className="flex items-center gap-3 px-3 py-3">
            <div
              className="
                w-9 h-9
                rounded-full
                bg-gray-900 dark:bg-white
                text-white dark:text-gray-900
                flex
                items-center
                justify-center
                text-sm
                font-medium
                shrink-0
              "
            >
              A
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="
                  text-sm
                  font-medium
                  text-gray-900 dark:text-white
                  truncate
                "
              >
                Admin
              </p>

              <p
                className="
                  text-xs
                  text-gray-400 dark:text-gray-500
                  truncate
                "
              >
                Administrator
              </p>
            </div>

            <button
              className="
                text-gray-400
                dark:text-gray-500
                hover:text-gray-700
                dark:hover:text-gray-200
                transition-colors
              "
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

const SidebarItem = ({ icon, label, to, onClick }) => {
  if (!to) {
    return (
      <button
        className="
          w-full
          flex
          items-center
          gap-3
          px-3
          py-2.5
          rounded-lg
          text-sm
          font-medium

          text-gray-500
          dark:text-gray-400

          hover:bg-gray-50
          dark:hover:bg-gray-900

          hover:text-gray-900
          dark:hover:text-white

          transition-colors
        "
      >
        {icon}

        <span>{label}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `
          w-full
          flex
          items-center
          gap-3
          px-3
          py-2.5
          rounded-lg
          text-sm
          font-medium
          transition-colors

          ${
            isActive
              ? `
                bg-gray-100
                dark:bg-gray-800

                text-gray-900
                dark:text-white
              `
              : `
                text-gray-500
                dark:text-gray-400

                hover:bg-gray-50
                dark:hover:bg-gray-900

                hover:text-gray-900
                dark:hover:text-white
              `
          }
        `
      }
    >
      {icon}

      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
