export const serviceAccount = {
  "projectId": process.env.NEXT_PUBLIC_PROJECT_ID,
  "privateKey": process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
  "clientEmail": process.env.NEXT_PUBLIC_CLIENT_EMAIL
}
