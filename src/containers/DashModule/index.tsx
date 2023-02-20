
import HouseTest from "../../pages/HouseTest";
import Link from "next/link"
import { MouseEvent } from "react"
import { AiOutlineHome, AiOutlineTransaction, AiOutlineUser } from "react-icons/ai"


const dashModule = [
  { name: 'House', icon: AiOutlineHome, current: true },
  { name: 'Transaction', icon: AiOutlineTransaction, current: false },
  { name: 'User', icon: AiOutlineUser, current: false },
]

export const DashModule = () => {
  // const handleItemDashModule = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, name: string) => {
  //   e.preventDefault
  //   //router.push(`./House/index`);
  // }
  return (
    <nav className="mt-6 px-3">
      <div className="space-y-1" >
        {/* {dashModule.map((item) => (
          <Link key={item.name} href={"/House/index"}>
            <div
              className='group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            >
              <item.icon
                className='text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'
                aria-hidden="true"
              />
              <span>{item.name}</span>
            </div>
          </Link>
        ))} */}
      </div>
    </nav>
  )
}