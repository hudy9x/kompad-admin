import Layout from '@/containers/Layout'
import { trpc } from '@/utils/trpc'
import dayjs from 'dayjs';
import Image from 'next/image';

export default function User() {
  const allUsers = trpc.getAllUsers.useQuery({term: ''});

  console.log(allUsers.data)

  return (
    <Layout>
      <div id="user" className="pt-8 px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
        <div className="rounded-md border border-gray-300 bg-white shadow-lg py-3">
          <table className="divide-y w-full" >
            {allUsers.isSuccess ? allUsers.data.users.map(user => {
              const date = dayjs(user.createdAt?.seconds);
              return <tr className="text-sm text-gray-900" key={user.uid}>
                <td className="px-4 py-2 flex items-center gap-2">
                  <Image src={user.photoURL} width={30} height={30} alt="Avatar" />
                  {user.email}
                </td>
                <td className="px-4 py-2">{user.address}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2">{user.fullname}</td>
                <td className="px-4 py-2">{date.format('DD/MM/YYYY')}</td>

              </tr>
            }) : null}
          </table>
        </div>
      </div>
    </Layout>
  )
}
