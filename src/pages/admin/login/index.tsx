import { Input } from "@/components/Controls"
import { messageSuccess, messageError } from "@/components/Message"
import { signIn } from "@/services/signin"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from 'next/router';
import { trpc } from '../../../utils/trpc';

const SigninSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
  about: Yup.string().min(10).max(100)
})

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (user) => {
      SigninSchema.validate(user, { abortEarly: false }).then(valid => {
        const { username, password } = user;
        signIn(username, password).then((user) => {
          if (user) {
            messageSuccess("Signing in successfully ! 😎");
            router.push('/admin/house')
          } else {
            alert("username or password invalid");
          }
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
        })
      }).catch(err => {
        if (!err.inner.length) return

        const errors = err.inner as Yup.ValidationError[];
        const errorMessages = { username: '', password: '', about: '' }

        errors.forEach(error => {
          if (!error.message || !error.path) return;

          errorMessages[error.path as keyof typeof errorMessages] = error.message
        })

        formik.setErrors(errorMessages)

      })
    }
  })


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
