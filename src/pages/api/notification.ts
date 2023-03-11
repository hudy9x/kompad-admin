// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Pusher from 'pusher'

type Data = {
  name: string
}

const env = process.env

const pusher = new Pusher({
  appId: env.PUSHER_APP_ID || '',
  key: env.PUSHER_KEY || '',
  secret: env.PUSHER_SECRET || '',
  cluster: env.PUSHER_CLUSTER || '',
  useTLS: (env.PUSHER_TLS || '') === 'true' ? true : false,
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  pusher.trigger('admin', 'transaction', {
    message: '',
  })
  res.status(200).json({ name: 'John Doe' })
}
