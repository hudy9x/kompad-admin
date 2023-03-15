import { Input, messageError, messageSuccess } from "@/components";
import { signIn } from "@/services/sign";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signin() {
  const [ validating, setValidating ] = useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: ({ email, password }) => {
      setValidating(true)
      signIn(email, password).then(user => {

        if (!user) {
          messageError("You're not admin")
          setValidating(false)
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
            messageSuccess("Login in succesfully. Waiting for redirecting ...")
            router.push('/user')
          }).catch(err => {
              messageError("Your information incorrect or your're not admin")
              console.log(err)
            }).finally(() => {
              setValidating(false)
            })
        })

      }).catch(err => {
        console.log(err)
        setValidating(false)
        messageError("Login failure")
      })
    }

  })

  const test = () => {
    fetch('/api/hello')
  }


  return <div className="signin w-screen h-screen flex items-center justify-center">
    <div className="card py-8 px-8 w-[400px] relative">
      <div className={`sign-loading ${validating ? 'displayed' : ''}`}>Validating ...</div>
      <h2 className="text-2xl font-extrabold mb-1" >Welcome back commander !</h2>
      <p className="text-gray-400 mb-3">No entry without permission</p>
      <form className="space-y-3" onSubmit={formik.handleSubmit} >
        <Input title="Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
        <Input title="Password" name="password" type="password" value={formik.values.password} onChange={formik.handleChange} />
        <button className="btn" type="submit">Signin</button>
      </form>
    </div>
  </div>
}
