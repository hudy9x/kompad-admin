import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import GetDesktopApp from "./GetDesktopApp"
import Logout from "./Logout"
import Notification from "./Notifications"
import Settings from "./Settings"
import Support from "./Support"
import ViewProfile from "./ViewProfile"

export const UserAction = () => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
        <div className="py-1">
          <Menu.Item>
            <ViewProfile/>
          </Menu.Item>
          <Menu.Item>
            <Settings/>
          </Menu.Item>
          <Menu.Item>
            <Notification/>
          </Menu.Item>
        </div>
        <div className="py-1" >
          <Menu.Item>
            <GetDesktopApp/>
          </Menu.Item>
          <Menu.Item>
            <Support/>
          </Menu.Item>
        </div>
        <div className="py-1">
          <Menu.Item>
            <Logout/>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Transition>
  )
}