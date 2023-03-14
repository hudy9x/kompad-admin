import { Input, messageError } from "@/components";
import { signIn } from "@/services/sign";
import { useFormik } from "formik";
import { useRouter } from "next/router";

export default function Signin() {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    }, 
    onSubmit: ({email, password}) => {
      signIn(email, password).then(user => {

        if (!user) {
          messageError("You're not admin")
          return;
        }

        const u = user.user

        u.getIdToken().then(idToken => {
          console.log('idToken', idToken)
          fetch('/api/create-session', {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              token: idToken,
              email: u.email,
              uid: u.uid
            })
          }).then(res => {
              console.log('session has been created')
              router.push('/user')
            }).catch(err => console.error(err))
        })

      }).catch(err => {
          messageError("Login failure")
        })
    }

  })

  const test = () => {
    fetch('/api/hello')
  }


  return <div className="signin w-screen h-screen flex items-center justify-center">
    <div className="card py-8 px-8 w-[400px]">
      <h2 className="text-2xl font-extrabold mb-1" >Welcome back commander !</h2>
      <p className="text-gray-400 mb-3">No entry without permission</p>
        <button onClick={test}  className="btn" >Test</button>
      <form className="space-y-3" onSubmit={formik.handleSubmit} >
        <Input title="Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
        <Input title="Password" name="password" type="password" value={formik.values.password} onChange={formik.handleChange} />
        <button className="btn" type="submit">Signin</button>
      </form>
    </div>
  </div>
}
