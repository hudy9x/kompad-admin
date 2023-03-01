import { z } from 'zod';
import { procedure, router } from '../trpc';
import { adminAuth } from '@/libs/firebase-admin';

const checkRoleAdmin = async (uuid: string) => {
  try {
    const userRecord = await adminAuth.getUser(uuid);
    if(!userRecord.customClaims) {
      return false;
    }
    const isAdmin = userRecord.customClaims.admin;
    return isAdmin;
  } catch (er) {
    console.error(er);
  }
}

export const providerAdmin = async (uuid: string) => {
  try { 
    await adminAuth.setCustomUserClaims(uuid, { admin: true });
    return true;
  } catch (error) {
    console.log(error);
  }
}

export const roleRouter = router({
  providerAdminRole: procedure
    .input(
      z.object({
        uuid: z.string()
      })
    )
    .mutation( async ({ input }) => {
      try {
        const isAdmin = await checkRoleAdmin(input.uuid);
        if(isAdmin) {
          return false;
        }
        const isAdminProvider = await providerAdmin(input.uuid);
        return isAdminProvider;
      } catch (err) {
        console.log(err)
      }
    })
}) 
