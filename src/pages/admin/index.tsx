import Link from "next/link"
import { AiOutlineHome, AiOutlineTransaction, AiOutlineUser } from "react-icons/ai"

const dashModule = [
  { name: 'House', icon: AiOutlineHome, href:'house', current: true },
  { name: 'Transaction', icon: AiOutlineTransaction, href:'transaction', current: false },
  { name: 'Users', icon: AiOutlineUser, href:'users', current: false },
]

export const DashModule = () => {
  return (
    <nav className="mt-6 px-3">
      <div className="space-y-1" >
        {dashModule.map((item) => (
          <Link key={item.name} href={`/admin/${item.href}`}>
            <div
              className='group flex items-center px-2 py-2 text-base leading-5 rounded-md dropdown'
            >
              <item.icon
                className='text-gray-400 group-hover:text-gray-500 mr-3 flex-shrink-0 h-6 w-6'
                aria-hidden="true"
              />
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}
