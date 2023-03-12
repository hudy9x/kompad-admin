import { subscribeToTopic } from "@/libs/firebase-admin";
import { NOTIFY_TOPIC } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(500).end()
  }

  console.log('===========================')
  const body = req.body
  const token = body.token;

  if (!token) {
    return res.status(400).end()
  }

  subscribeToTopic(token, NOTIFY_TOPIC.TRANSACTION).then(result => {
    console.log(`subscribed ${token.join(',')} to ${NOTIFY_TOPIC.TRANSACTION}`)
    res.status(200).end()
  })
  .catch(err => {
    console.log(err)
    res.status(500).end()
  })

}
