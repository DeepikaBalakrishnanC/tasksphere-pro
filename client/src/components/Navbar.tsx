import {

  Bell,

  LogOut,

  Search,

  UserCircle

} from "lucide-react";

import {
  useState
} from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";


const notifications = [
  "Launch brief synced to offline cache",
  "Missions board received a GraphQL refresh",
  "Crew handoff needs one final review"
];

const Navbar = () => {
  const navigate =
    useNavigate();

  const {
    user,
    logout
  } = useAuth();

  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState(false);

  const [hasUnread, setHasUnread] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((isOpen) => !isOpen);
    setHasUnread(false);
  };

  const handleSearch = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const query =
      search.trim();

    if (query) {
      navigate(
        `/projects?search=${encodeURIComponent(query)}`
      );
    }
  };

  return (

    <header
      className="border-b border-white/10 bg-[#101318]/90 p-4 backdrop-blur lg:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <form
          onSubmit={handleSearch}
          className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-[#1b2029] px-4 py-2 lg:w-[28rem]"
        >

          <Search size={18} className="text-[#15b8a6]" />

          <input

            type="text"

            placeholder="Search missions, owners, status..."

            value={search}

            onChange={(e) => setSearch(e.target.value)}

            className="w-full bg-transparent text-[#f7f3e8] outline-none placeholder:text-[#8d948e]"

          />

        </form>


        <div
          className="flex items-center justify-between gap-4 lg:justify-end lg:gap-5"
        >

          <div className="relative">
            <button
              className="relative rounded-lg border border-white/10 bg-[#1b2029] p-2 hover:border-[#15b8a6]"
              aria-label="Notifications"
              onClick={toggleNotifications}
            >

              <Bell size={22} />

              {hasUnread && (
                <span
                  className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[#e85d75] text-xs"
                >

                  3

                </span>
              )}

            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 z-40 mt-3 w-80 rounded-lg border border-white/10 bg-[#151922] p-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold">
                    Signal Inbox
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsNotificationsOpen(false)}
                    className="text-sm text-[#9fb3ad] hover:text-white"
                  >
                    Close
                  </button>
                </div>
                <div className="mt-3 space-y-3">
                  {notifications.map((notification) => (
                    <p
                      key={notification}
                      className="rounded-lg bg-[#101318] p-3 text-sm text-[#d9d3c3]"
                    >
                      {notification}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>


          <div
            className="flex items-center gap-2"
          >

            <UserCircle size={32} className="text-[#f59e0b]" />

            <div>

              <p className="font-semibold">

                {user?.name || "Mission Lead"}

              </p>

              <p className="text-xs text-[#9fb3ad]">

                {user?.email || "crew@pulseforge.app"}

              </p>

            </div>

          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#1b2029] px-3 py-2 text-sm text-[#f7f3e8] hover:border-[#e85d75]"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>
      </div>

    </header>

  );

};

export default Navbar;
