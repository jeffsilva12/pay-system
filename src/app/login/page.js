"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {

    e.preventDefault()

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (res.error) {
      setError("Invalid email or password")
      return
    }

    router.push("/dashboard")
  }

  return (

    <div className="page page-center">

      <div className="container container-tight py-4">

        <div className="text-center mb-4">
          <h1>Pay System</h1>
        </div>

        <div className="card card-md">

          <div className="card-body">

            <h2 className="card-title text-center mb-4">
              Login
            </h2>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-footer">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Sign in
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  )
}