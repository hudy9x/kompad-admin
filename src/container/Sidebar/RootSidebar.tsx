import { DashModule } from "@/pages/admin";
import Image from "next/image";
import { Search } from "../Search";

import { UserInfo } from "../UserInfo";

export const RootSidebar = () => {
  return (
      <div className="sidebar lg:w-64 lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">
        <div className="items-center px-6">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
        </div>
        <div className="mt-5 flex h-0 flex-1 flex-col pt-1">
          <UserInfo />
          <Search />
          <DashModule />
        </div>
      </div>
  )
}