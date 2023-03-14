import { USER_TOKEN } from "@/libs/jwt";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    serialize(USER_TOKEN, '', {
      path: '/',
      sameSite: true,
      httpOnly: true,
      secure: true,
      maxAge: -1
    })
  )
  res.status(200).end()
}
