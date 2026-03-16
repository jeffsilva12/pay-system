"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/app/components/Sidebar"

export default function UsersPage() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/usuarios")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (


    <div className="page">
      <Sidebar />

      <div className="page-wrapper">
        <div className="d-flex justify-content-between mb-3">
          <h2>Usuários</h2>

          <a href="/usuarios/cadastrar" className="btn btn-primary">
            Novo Usuário
          </a>
        </div>

        <div className="card">

          <div className="table-responsive">

            <table className="table table-vcenter">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td>{user.id}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>
                      <span className={`badge bg-${user.active ? "success" : "secondary"}`}>
                        {user.active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td>
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>


  )
}