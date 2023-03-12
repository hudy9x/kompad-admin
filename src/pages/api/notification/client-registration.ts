import { subscribeToTopic } from "@/libs/firebase-admin";
import { NOTIFY_TOPIC } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(500);
  }

  console.log('===========================')
  const body = req.body
  const token = body.token;

  if (!token) {

    return res.status(400)
  }

  subscribeToTopic(token, NOTIFY_TOPIC.TRANSACTION).then(result => {
    res.status(200)
  })
    .catch(err => {
      console.log(err)
      res.status(500)
    })

}
