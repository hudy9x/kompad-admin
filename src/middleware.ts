import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { adminAuth } from './libs/firebase-admin';

const verifySessionCookie = async (token: string) => {
  try {
    const isVerifySessionCookie = await adminAuth.verifySessionCookie(token);
    return isVerifySessionCookie;
  } catch (error) {
    console.log(error);
  }
}

export const middleware = async (req: NextRequest) => {
  const token = await req.cookies.get('user-token')?.value;
  if(!token) {
   return;
  }
  const isVerifySessionCookie = await verifySessionCookie(token);
  if(!isVerifySessionCookie) {
   return NextResponse.redirect(new URL('/admin/login', req.url));
  }
}

export const config = {
 matcher: ['/admin/house' ,'/admin/transaction', '/admin/users'],
}