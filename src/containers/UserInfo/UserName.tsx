import { Menu } from "@headlessui/react"
import { HiChevronDown } from "react-icons/hi"
//import Image from "next/image"

export const UserName = () => {
  return (
    <div>
      <Menu.Button className="group w-full rounded-md bg-gray-100 px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-100">
        <span className="flex w-full items-center justify-between">
          <span className="flex min-w-0 items-center justify-between space-x-3">
            {/* <Image
              className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
              width={12}
              height={12}
              alt=""
            /> */}
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-gray-900">Jessy Schwarz</span>
              <span className="truncate text-sm text-gray-500">@jessyschwarz</span>
            </span>
          </span>
          <HiChevronDown
            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </span>
      </Menu.Button>
    </div>
  )
}