import {

  FolderKanban,

  Gauge,

  RadioTower,

  Settings,

  Users

} from "lucide-react";

import {
  NavLink
} from "react-router-dom";


const linkClass = ({
  isActive
}: {
  isActive: boolean;
}) =>
  `flex items-center gap-3 rounded-lg px-3 py-3 transition ${
    isActive
      ? "bg-[#15b8a6] text-[#071211]"
      : "text-[#d9d3c3] hover:bg-white/8 hover:text-white"
  }`;

const Sidebar = () => {

  return (

    <aside
      className="border-b border-white/10 bg-[#151922]/95 p-4 lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r lg:p-6"
    >

      <div className="mb-7 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-[#f59e0b] text-[#211407]">
          <RadioTower size={24} />
        </div>
        <div>
          <h1
            className="text-2xl font-black"
          >

            PulseForge

          </h1>
          <p className="text-xs uppercase text-[#9fb3ad]">
            Launch Control
          </p>
        </div>
      </div>


      <nav
        className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1"
      >

        <NavLink

          to="/dashboard"

          className={linkClass}

        >

          <Gauge size={20} />

          Command

        </NavLink>


        <NavLink

          to="/projects"

          className={linkClass}

        >

          <FolderKanban size={20} />

          Missions

        </NavLink>


        <NavLink

          to="/team"

          className={linkClass}

        >

          <Users size={20} />

          Crew

        </NavLink>


        <NavLink

          to="/settings"

          className={linkClass}

        >

          <Settings size={20} />

          Systems

        </NavLink>

      </nav>

      <div className="mt-8 hidden rounded-lg border border-white/10 bg-[#101318] p-4 lg:block">
        <p className="text-sm font-semibold text-[#f7f3e8]">
          Today's signal
        </p>
        <p className="mt-2 text-sm text-[#b7afa0]">
          Keep the build train moving. Review, unblock, ship.
        </p>
      </div>

    </aside>

  );

};

export default Sidebar;
