import { cert, initializeApp, getApps, App } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

const serviceAccount = {
  projectId: 'kompad-a9b60',
  clientEmail: 'firebase-adminsdk-cgvyq@kompad-a9b60.iam.gserviceaccount.com',
  privateKey: `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDyrqmYe18ehJsg\nZ3js95i44R+43p02yQtn2L7f7fy6K0syrw2V/LIyd762OQixeOdO3vI1tSy5Irhz\nmZLnvcmFXJbaj/CQD2eAAJ0mwrOt3mNCe/xmjSaPZ4d8XtaS27zxuTkEmabWNJIl\nPBmqy/fTIKGSeO/Yx+K7OBeVO/ZKAU0xniwlDF0x4VEP2D4Sei279LmjsF1Gv34X\nvPlU8nM8Z3LIqrofhengVkouPiU9hBeatOImxuQ1YSKGsg92cbhThIVrmNt7FkzV\nFx0MyVBh4tCoOL32ey8+gOo8wR399cinH7SPLD5yqcWtuUAYO7OsyOE91aEgYKHw\n8v+VsA+LAgMBAAECggEAFeTVDxkeQToUZq1/Ft3VjORegMawp0cm/MTsn3YwhTkv\nrRBm6N+l0fDEp1ro4l32fEKX1mmUcdVkj6VMwBR6sEnkoC45NT32h/FGPD93h1mX\nWeGmqTfVwT1FV16U/CXP23zq3HPiPdP7VVmhNSv2nTkF6pl3hfauiVZrpj6FHzLm\n4yFuMRCYRjV68I0psnf5wP2DiXkYVHiN3omY9CvYjV5Rf53eJ5AUKFokOi+ubrU8\n8OYgL02JUF7TcMs5yahNWh0przMPYUvuFc6HfGJommjSeBH5rw7RaWIDaCpEMme2\nuZh2HKAuHbn3k21/1yS/pXyd+D9RxD2LfT5o6hmbdQKBgQD5b5CaitdQMoqbhdF5\n+kr1biftrSh1ge7BS/2t2+H854RW3KKVyuIm+DBjMhYbTasHcGMAG4EvNrhMh6IO\n+JQxi+91fX3ct70RvLRoV5RFarJ+b8NPCOmB4LGKeirtwUeyWjxjXtz6rrq/F3+H\nVHhjAu+LiWf21bMHCTTLgVmKJwKBgQD5EZl4/NPwqtTaCcBaPx+lBuNEazw1CApq\n3zYP1vyOnM+WXzBapq3y0bTplx/OmgYQqEVo1YefkPUtvBhEsPQE+b4TAp4/+emR\n9m9WFWYDdhO6YPdswvw8MrtQgu5T4rXgCNC2LYEXIQrrE093qOoN6MV2fMGTiTVx\nZDq4zzCh/QKBgQCboOo+IkZ4+S/WHUY3rty6CQLMnm9R8cG/xOQAZ+K2YtUFRSAE\nCdPUsKGwIn38hxcgyxRZ6s9NX/zZcv7ADISZ7U94pNW0ssc6m9yMBaizLwEzNhRL\n6amXqVPcrKDAOwm60+Y9seB6YC6QL98X1rJORHSlQRQmw+qxhyLznj75nQKBgDvU\nhXhxy3uxncXut702EqTy3Z8u31yh3NbFXdg6PZsIgjlODnCIP5rn0zyVp/daOoC/\n20SOnrCvAqaE25OMqmGTmJw6ccdOglQkzaPxKftE3wJTjrwarrrLOQHjIdsWx7fU\nhkZs8eibcGL91YYaFndW5jBLUbjeKe9eM1j3tGgFAoGBAKOPmGUGeFuSJfjsIoaK\nWorcRDlsMBifbiQYCwjrSaN+XCKO2KgcjfSqGL85x0GxmX6eqyRcTkNQDxGTWkpb\nyuMtj8y2yHHEy3yObxKp3g0b04wYy5r+D0twuF2Lwcz5z5CxuhzUDx3SzVti4oJo\n8EwiI/9ezs1NRu9L77pHFRsL\n-----END PRIVATE KEY-----\n`,
}

let app: App
if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
  })
} else {
  app = getApps()[0]
}

export const verifyFirebaseSessionCookie = async (session: string) => {
  const decoded = await getAuth().verifySessionCookie(session, true)
  return decoded
}

export const db = getFirestore(app)

const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.collection('users')
      .get()
      .then((res) => {
        const users = {}
        res.forEach((doc) => {
          const data = doc.data()
          // users[doc.id] = data.email;
        })

        resolve(users)
      })
  })
}
