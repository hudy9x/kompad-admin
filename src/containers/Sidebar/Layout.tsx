import Users from "@/pages/admin/users";
import React from "react";
import { RootSidebar } from "./RootSidebar";

const Layout = ({ children }: {
  children: any
}) => {
  return (
    <div className="h-screen flex flex-row justify-start">
      <RootSidebar />
      <div className="bg-primary flex-1 p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;