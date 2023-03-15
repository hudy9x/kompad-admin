import { NextRequest, NextResponse } from "next/server";
import { USER_TOKEN, verifyJWT } from "./libs/jwt";

const isPublicPath = (path: string) => {
  return path.includes('_next/') || path.includes('favicon.ico') || path.includes('firebase-messaging-sw') || path.includes('/api/create-session')
}

export async function middleware(req: NextRequest) {
  const session = req.cookies.get(USER_TOKEN)
  const url = req.nextUrl;
  const href = url.href

  if (isPublicPath(href)) {
    return
  }

  if (!session) {
    if (!href.includes('/signin')) {
      console.log(1.1)
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    console.log(1.2)
    return NextResponse.next()
  }

  const jwtToken = session.value;
  const jwtData = await verifyJWT(jwtToken)

  if (jwtData) {

    if (href.includes('/signin')) {
      console.log(2.1)
      return NextResponse.redirect(new URL("/user", req.url));
    }

  } else {
    if (!href.includes('/signin')) {
      console.log(2.2)
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }


}
