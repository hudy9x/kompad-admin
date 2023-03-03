import { Input } from '@/components'
import { trpc } from '../utils/trpc'

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: 'client' })
  if (!hello.data) {
    return <div>Loading...</div>
  }
  return <div></div>
}
