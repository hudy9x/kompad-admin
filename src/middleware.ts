import { NextRequest, NextResponse } from "next/server";
import { USER_TOKEN, verifyJWT } from "./libs/jwt";

const isPublicPath = (path: string) => {
  return path.includes('_next/') || path.includes('favicon.ico') || path.includes('firebase-messaging-sw')
    || path.includes('/api/create-session') || path.includes('/api/notification/send')
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
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    return NextResponse.next()
  }

  const jwtToken = session.value;

  try {
    const jwtData = await verifyJWT(jwtToken)

    if (jwtData) {

      if (href.includes('/signin')) {
        return NextResponse.redirect(new URL("/user", req.url));
      }

    } else {
      if (!href.includes('/signin')) {
        return NextResponse.redirect(new URL("/signin", req.url));
      }
    }
  } catch (error) {
    if (!href.includes('/signin')) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

}

