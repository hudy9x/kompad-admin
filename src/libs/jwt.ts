import { nanoid } from "nanoid";
import { jwtVerify, SignJWT } from "jose";
const secret = "I@#$982skjdf23"

// export const generateJWT = (data: {uid: string, email: string}) => {
//   return sign(data, secret, { expiresIn: '1d' })
// }
//
// export const verifyJWT = (token: string) => {
//   return verify(token, secret)
// }
export const USER_TOKEN = "USER_TOKEN";

export async function generateJWT() {
  const jwtToken =  await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(secret))


  return jwtToken
}

export const verifyJWT = async (token: string) => {
  try {
    const verified = await jwtVerify(token,new TextEncoder().encode(secret))
    return verified.payload;
  } catch (error) {
    throw new Error("Your token is expired")
  }
}

