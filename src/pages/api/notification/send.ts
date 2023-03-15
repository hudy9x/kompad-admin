import { sendNotify } from "@/libs/firebase-admin";
import { NOTIFY_TOPIC } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('ran into here')
  const body = req.body;
  const topic = NOTIFY_TOPIC.TRANSACTION

  return sendNotify({
    title: body.title,
    body: body.body,
    link: body.link
  }, topic).then(messId => {
    console.log('message id', messId)
    res.status(200).end()
  }).catch(err => {
    res.status(500).end()
  })
}
