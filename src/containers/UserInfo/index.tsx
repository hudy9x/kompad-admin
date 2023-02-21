import { Menu } from "@headlessui/react"
import { UserAction } from "./UserAction"
import { UserName } from "./UserName"


export const UserInfo = () => {
  return (
    <Menu as="div" className="relative inline-block px-3 text-left">
      <UserName/>
      <UserAction/>
    </Menu>
  )
}