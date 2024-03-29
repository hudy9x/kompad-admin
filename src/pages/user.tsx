import { Input } from '@/components'
import Layout from '@/containers/Layout'
import { trpc } from '@/utils/trpc'
import dayjs from 'dayjs'

export default function User() {
  const allUsers = trpc.getAllUsers.useQuery({ term: '' })

  const onClick = () => {
    fetch('/api/notification/send').then(res => {
      console.log('send notification sucecs', res)
    })
  }

  return (
    <Layout title="User">
      <div className="bg-white border-t border-t-gray-200 shadow" >
        <div className="header-section">
          <Input placeholder="Search ..." />
        </div>
      </div>
      <div id="user" className="container">
        <button className='btn' onClick={onClick} >Send a test notification</button>
        <h1 className="card-title">Recently activities</h1>
        <div className="card">
          <div className="tab">
            <div className={`tab-item`}>Active</div>
            <div className={`tab-item`}>Inactive</div>
          </div>
          <table className="">
            <thead>
              <tr className="row">
                <th className="text-left">uid</th>
                <th className="text-left cell-mobile-hidden">email</th>
                <th className="cell-mobile-hidden text-left">Address</th>
                <th className="text-left">Status</th>
                <th className="cell-mobile-hidden text-center">Fullname</th>
                <th className="" >Created At</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.isSuccess
                ? allUsers.data.users.map((user) => {
                  const fbDate = user.createdAtDate
                  const date = dayjs(fbDate)
                  return (
                    <tr className="row" key={user.id}>
                      <td className="cell">
                        <span className="truncate w-24 block">
                          {user.id}
                        </span>
                      <div className="cell-mobile-show">
                        <div>{user.email}</div>
                        <div>{user.fullname}</div>
                        <div>{user.address}</div>
                      </div>
                      </td>
                      <td className="cell cell-mobile-hidden">{user.email}</td>
                      <td className="cell cell-mobile-hidden">{user.address}</td>
                      <td className="cell">{user.status}</td>
                      <td className="cell cell-mobile-hidden">{user.fullname}</td>
                      <td className="cell">{date.format('DD/MM/YYYY')}</td>
                    </tr>
                  )
                })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
