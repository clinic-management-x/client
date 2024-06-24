import BottomBar from "@/components/layout/BottomBar";
import DrawerSlideBar from "@/components/layout/DrawerSlideBar";
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen bg-white dark:bg-[#212121] ">
      <div className="w-full  hidden md:flex">
        <SideBar />
        <div className="w-full h-full flex flex-col">
          <NavBar />
          {children}
        </div>
      </div>
      <div className="w-full flex flex-col md:hidden">
        <TopBar />
        <DrawerSlideBar />
        {children}
        <BottomBar />
      </div>
    </div>
  );
};

export default Layout;
