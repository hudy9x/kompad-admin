import { serialize } from "cookie";
import { verifyIdtoken } from "@/libs/firebase-admin";
import { generateJWT, USER_TOKEN } from "@/libs/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { getUserById } from "@/services/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {token, uid, email} = req.body

  const isValidToken = await verifyIdtoken(token)

  if (!isValidToken) {
    return res.status(500).end()
  }

  console.log('called create-session')
  const user = await getUserById(uid)

  if (user.role !== 'ADMIN') {
    return res.status(400).end()
  }

  console.log('is admin')

  const jwtToken = await generateJWT()

  const expiresIn = 60 * 60 * 24 * 1 * 1000
  const options = {
    path: "/",
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  };

  res.setHeader("Set-Cookie", serialize(USER_TOKEN, jwtToken, options))
  res.status(200).end()
}
