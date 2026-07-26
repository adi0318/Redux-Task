import { Menu, Search, Bell } from "lucide-react";

import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const Navbar = ({ onMenuClick }) => {
  const adminName = useSelector((state) => state.settings.adminName);

  const location = useLocation();

  const pageInfo = {
    "/": {
      title: "Dashboard",
      subtitle: "Student Management",
    },

    "/students": {
      title: "Students",
      subtitle: "Student Directory",
    },

    "/settings": {
      title: "Settings",
      subtitle: "System Preferences",
    },
  };

  const currentPage = pageInfo[location.pathname] || {
    title: "StudentHub",
    subtitle: "Management Portal",
  };

  return (
    <header
      className="
        h-20
        bg-white dark:bg-gray-950
        border-b border-gray-200 dark:border-gray-800
      "
    >
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuClick}
            className="
              lg:hidden
              w-9 h-9
              flex
              items-center
              justify-center
              rounded-lg

              text-gray-500
              dark:text-gray-400

              hover:bg-gray-100
              dark:hover:bg-gray-900

              hover:text-gray-900
              dark:hover:text-white

              transition-colors
              shrink-0
            "
            aria-label="Open navigation menu"
          >
            <Menu size={21} />
          </button>

          <div className="min-w-0">
            <h1
              className="
                text-sm sm:text-base
                font-semibold
                text-gray-900 dark:text-white
                truncate
              "
            >
              {currentPage.title}
            </h1>

            <p
              className="
                text-xs sm:text-sm
                text-gray-400 dark:text-gray-500
                mt-0.5
                truncate
              "
            >
              {currentPage.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className="
              hidden sm:flex
              items-center
              w-40 md:w-56 lg:w-64
              h-10
              px-3
              gap-2
              rounded-xl

              bg-white dark:bg-gray-900

              border
              border-gray-200 dark:border-gray-800
            "
          >
            <Search
              size={17}
              className="
                text-gray-400
                dark:text-gray-500
                shrink-0
              "
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                w-full
                bg-transparent
                outline-none

                text-sm
                text-gray-700 dark:text-gray-200

                placeholder:text-gray-400
                dark:placeholder:text-gray-600
              "
            />
          </div>

          <button
            className="
              sm:hidden
              w-9 h-9
              flex
              items-center
              justify-center
              rounded-lg

              text-gray-500
              dark:text-gray-400

              hover:bg-gray-100
              dark:hover:bg-gray-900

              hover:text-gray-900
              dark:hover:text-white

              transition-colors
            "
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          <button
            className="
              relative
              w-9 h-9
              flex
              items-center
              justify-center
              rounded-lg

              text-gray-500
              dark:text-gray-400

              hover:bg-gray-100
              dark:hover:bg-gray-900

              hover:text-gray-900
              dark:hover:text-white

              transition-colors
            "
            aria-label="Notifications"
          >
            <Bell size={19} />

            <span
              className="
                absolute
                top-2
                right-2
                w-1.5
                h-1.5
                rounded-full
                bg-red-500
              "
            />
          </button>

          <div
            className="
              hidden sm:block
              h-7
              w-px
              bg-gray-200 dark:bg-gray-800
            "
          />

          <div className="flex items-center gap-2">
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
              {adminName?.charAt(0).toUpperCase()}
            </div>

            <div className="hidden xl:block">
              <p
                className="
                  text-sm
                  font-medium
                  text-gray-900 dark:text-white
                "
              >
                {adminName}
              </p>

              <p
                className="
                  text-xs
                  text-gray-400 dark:text-gray-500
                "
              >
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
