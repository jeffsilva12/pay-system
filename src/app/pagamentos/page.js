"use client"

import { useEffect, useState } from "react"
import Sidebar from "@/app/components/Sidebar"

export default function PaymentsPage() {

  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetch("/api/pagamentos")
      .then(res => res.json())
      .then(data => setPayments(data))
  }, [])

  return (

    <div className="page">

      <Sidebar />

      <div className="page-wrapper">
        <div className="d-flex justify-content-between mb-3">
          <h2>Pagamentos</h2>

          <a href="/pagamentos/cadastrar" className="btn btn-primary">
            Novo Pagamento
          </a>
        </div>

        <div className="card">

          <div className="table-responsive">

            <table className="table table-vcenter">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>

                {payments.map((p) => (

                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.user_email}</td>
                    <td>${p.amount}</td>

                    <td>
                      <span className={`badge bg-${p.status === "paid" ? "success" : "warning"}`}>
                        {p.status}
                      </span>
                    </td>

                    <td>
                      {new Date(p.created_at).toLocaleDateString()}
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