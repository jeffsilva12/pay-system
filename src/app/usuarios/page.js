"use client"

import { useEffect, useState } from "react"

export default function UsersPage() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/usuarios")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  return (

    <div>

      <div className="d-flex justify-content-between mb-3">
        <h2>Users</h2>

        <button className="btn btn-primary">
          New User
        </button>
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

  )
}