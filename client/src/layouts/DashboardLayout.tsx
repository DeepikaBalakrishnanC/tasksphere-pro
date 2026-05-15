import type { ReactNode }
from "react";

import Sidebar
from "../components/Sidebar";

import Navbar
from "../components/Navbar";


interface Props {

  children: ReactNode;

}


const DashboardLayout = ({
  children
}: Props) => {

  return (

    <div
      className="forge-grid flex min-h-screen flex-col bg-[#101318] text-[#f7f3e8] lg:flex-row"
    >

      <Sidebar />


      <div
        className="flex-1"
      >

        <Navbar />


        <main
          className="p-4 sm:p-6 lg:p-8"
        >

          {children}

        </main>

      </div>

    </div>

  );

};

export default DashboardLayout;
