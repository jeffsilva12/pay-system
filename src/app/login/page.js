"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleLogin(e) {
    e.preventDefault()

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()

    if (data.token) {
      router.push("/dashboard")
    } else {
      setError("Invalid credentials")
    }
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
              Acesse sua conta
            </h2>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>

              <div className="mb-3">
                <label className="form-label">E-mail</label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">

                <label className="form-label">
                  Senha
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Senha"
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
                  Entrar
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  )
}