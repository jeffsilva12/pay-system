"use client"

import { useEffect, useState } from "react"
import Layout from "@/app/components/Layout"
import Link from "next/link"
import { useSession } from "next-auth/react";

export default function UsersPage() {
  const { data: session } = useSession()

  if (session?.user.role !== "ADMIN") {
    return <p>Sem permissão</p>
  }
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/usuarios")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (
    <Layout>
      {/* Cabeçalho da Página */}
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">Usuários</h2>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <Link href="/usuarios/cadastrar" className="btn btn-primary">
                {/* Ícone de Plus (opcional) */}
                <svg xmlns="http://www.w3.org" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                Novo Usuário
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Corpo da Página */}
      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="table-responsive">
              <table className="table table-vcenter card-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Perfil</th>
                    <th>Criado em</th>
                    <th>Status</th>

                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td className="text-muted">{user.email}</td>
                      <td className="text-muted">{user.role}</td>
                      <td className="text-muted">{new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <span className={`badge bg-${user.status ? "success" : "alert"}`}>
                          {user.status ? "Ativo" : "Inativo"}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
