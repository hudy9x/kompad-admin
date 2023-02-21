import Link from "next/link"

const Logout = () => {
  return (
    <Link href="/admin/login" className="dropdown dropdown-content flex items-center px-4 py-2 text-sm">
      <span className="dropdown-text">Logout</span>
    </Link>
  )
}

export default Logout