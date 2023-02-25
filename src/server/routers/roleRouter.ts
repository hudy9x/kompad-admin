import { z } from 'zod';
import { procedure, router } from '../trpc';
import { adminAuth } from '@/server/libs/firebase-admin';
import { RoleAdmin } from '@/enums';

const checkRoleAdmin = async (uuid: string) => {
  try {
    const userRecord = await adminAuth.getUser(uuid);
    if(!userRecord.customClaims) {
      return;
    }
    const isAdmin = userRecord.customClaims.admin;
    return isAdmin;
  } catch (er) {
    console.error(er);
    return false;
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
        if(isAdmin) { // user is admin
          return RoleAdmin.EXIST
        }
        await adminAuth.setCustomUserClaims(input.uuid, { admin: true }); // provider admin for user
        return RoleAdmin.SUCCESS;
      } catch (err) {
        return RoleAdmin.ERR;
      }
    })
}) 
