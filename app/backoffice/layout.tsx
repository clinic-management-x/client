import NotificationDialog from "@/components/dialogs/notifications/page";
import BottomBar from "@/components/layout/BottomBar";
import DrawerSlideBar from "@/components/layout/DrawerSlideBar";
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen overflow-y-scroll bg-white dark:bg-[#212121] ">
      <div className="w-full  hidden md:flex">
        <SideBar />
        <div className="md:ml-[225px] lg:ml-[275px] w-full h-full flex flex-col">
          <NavBar />
          <NotificationDialog />
          <div className="mt-[80px]">{children}</div>
        </div>
      </div>
      <div className="w-full flex flex-col md:hidden">
        <TopBar />
        <NotificationDialog />
        <DrawerSlideBar />
        {children}
        <BottomBar />
      </div>
    </div>
  );
};

export default Layout;
