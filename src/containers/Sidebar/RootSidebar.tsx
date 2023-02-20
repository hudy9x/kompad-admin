import Image from "next/image";
import { DashModule } from "../DashModule";
import { Search } from "../Search";
import { UserInfo } from "../UserInfo";

export const RootSidebar = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 lg:bg-gray-100 lg:pt-5 lg:pb-4">
      <div className="flex flex-shrink-0 items-center px-6">
        <Image
          src="/images/logo128.png"
          alt="Logo"
          width={40}
          height={40}
        />
      </div>
      <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
        <UserInfo />
        <Search />
        <DashModule />
      </div>
    </div>
  )
}