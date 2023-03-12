import { sendNotify } from "@/libs/firebase-admin";
import { NOTIFY_TOPIC } from "@/types";
import { NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('ran into here')
  return sendNotify("Hellow", NOTIFY_TOPIC.TRANSACTION).then(messId => {
    console.log('message id', messId)
    res.status(200)
  }).catch(err => {
    res.status(500)
  })
}
