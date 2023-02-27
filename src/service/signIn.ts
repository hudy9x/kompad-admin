import { messageError, messageSuccess } from "@/components/Message";
import { LoginStatus } from "@/types";
import { Auth, signInWithEmailAndPassword, UserCredential } from "@firebase/auth";
interface StatusUser {
  status: string,
  mess: string
}

export const signIn = (auth: Auth, email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const getIdToken = async (userInfo: UserCredential) => {
  try {
    const idToken = await userInfo.user.getIdToken();
    return idToken;
  } catch (error) {
    console.log(error);
    return null
  }
}

export const checkUser = (statusUser: StatusUser) => {
  if(statusUser.status === LoginStatus.Error) {
    messageError(statusUser.mess);
    return false;
  }

  messageSuccess(statusUser.mess);
  return true;
}
