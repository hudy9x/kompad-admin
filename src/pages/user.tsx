import Layout from '@/containers/Layout'
import { trpc } from '@/utils/trpc'
import dayjs from 'dayjs';
import Image from 'next/image';

export default function User() {
  const allUsers = trpc.getAllUsers.useQuery({term: ''});

  return (
    <Layout>
      <div id="user" className="container">
        <div className="card">
          <table className="divide-y w-full" >
            <tbody>
              {allUsers.isSuccess ? allUsers.data.users.map(user => {
                const fbDate = user.createdAtDate
                const date = dayjs(fbDate);
                return <tr className="text-sm text-gray-900" key={user.uid}>
                  <td className="px-4 py-2 flex items-center gap-2">
                    { user.photoURL ? <Image src={user.photoURL} width={30} height={30} alt="Avatar" /> : <div className='w-[30px] h-[30px] bg-gray-100'></div> }
                    { user.email }
                  </td>
                  <td className="px-4 py-2">{user.address}</td>
                  <td className="px-4 py-2">{user.status}</td>
                  <td className="px-4 py-2">{user.fullname}</td>
                  <td className="px-4 py-2">{date.format('DD/MM/YYYY')}</td>

                </tr>
                }) : null}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
