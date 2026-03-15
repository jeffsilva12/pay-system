"use client"

import { useEffect, useState } from "react"

export default function PaymentsPage() {

  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetch("/api/pagamentos")
      .then(res => res.json())
      .then(data => setPayments(data))
  }, [])

  return (

    <div>

      <div className="d-flex justify-content-between mb-3">
        <h2>Payments</h2>

        <button className="btn btn-primary">
          New Payment
        </button>
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

  )
}