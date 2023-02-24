import { z } from 'zod';
import { procedure, router } from '../trpc';
import admin from 'firebase-admin';
import { messageError, messageSuccess } from '@/components/Message';

export const adminRole = router({
  providerAdminRole: procedure
    .input(
      z.object({
        uuid: z.string()
      })
    )
    .query(({ input }) => {
      admin.auth().setCustomUserClaims(input.uuid, { admin: true }).then(() => {
        messageSuccess('Admin privilege granted successfully');
      }).catch(() => {
        messageError('Failed to grant admin privilege');
      })
    })
}) 

// export type definition of API
export type AdminRoleRouter = typeof adminRole;