import { Input } from "@/components/Controls"
import { useFormik } from "formik"
import { useRouter } from 'next/router';
import { trpc } from "@/utils/trpc";
import { messageError } from "@/components/Message";
import { checkUser, getIdToken, signIn } from "@/service/signIn";
import { auth } from "@/libs/firebase";
import { serviceAccount } from "@/config/serviceAccount";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const mutation = trpc.addTokenUser.useMutation();


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: ({ username, password }) => {
      signIn(auth, username, password).then(async (user) => {
        const idToken = await getIdToken(user);
        if (!idToken) {
          console.log('NOT ID TOKEN');
          return;
        }
        await mutation.mutate({
          email: username,
          password: password,
          idToken: idToken
        })
      }).catch(err => {
        console.dir(err)
        let mess = ''
        switch (err.code) {
          case "auth/wrong-password":
            mess = "Wrong password";
            break;

          case "auth/user-not-found":
            mess = "User not found";
            break;

          case "auth/internal-error":
            mess = "Internal Error"
            break;

          case "auth/invalid-email":
            mess = "Invalid email"
            break;

          default:
            mess = "Something went wrong"
            break;
        }

        messageError(mess)
      });
    }
  })
  
  useEffect(() => {
    if(!mutation.data) {
      return;
    }
    const isUser = checkUser(mutation.data);
    if (isUser) {
      router.push('/admin/house');
    }
  }, [mutation.data, router])
  return (
    <div className="flex h-screen">
      <div className="m-auto border bg-white p-6 shadow-lg rounded-lg w-[500px]">
        <h2 className="text-lg font-medium leading-6 text-gray-900">Profile</h2>
        <p className="mt-1 text-sm text-gray-500">
          This information will be displayed publicly so be careful what you share
        </p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-4">
          <Input
            title="Username"
            error={formik.errors.username}
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <Input
            title="Password"
            type="password"
            name="password"
            error={formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <button className="btn btn-primary">Submit</button>

        </form>
      </div>
    </div>
  )
}
