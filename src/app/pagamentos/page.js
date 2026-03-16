"use client"

import { useEffect, useState } from "react"
import Layout from "@/app/components/Layout"
import Link from "next/link"

export default function PaymentsPage() {
  const [payments, setPayments] = useState([])

  useEffect(() => {
    fetch("/api/pagamentos")
      .then(res => res.json())
      .then(data => setPayments(data))
  }, [])

  return (
    <Layout>
      {/* Cabeçalho da Página */}
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">Pagamentos</h2>
            </div>
            <div className="col-auto ms-auto d-print-none">
              <Link href="/pagamentos/cadastrar" className="btn btn-primary">
                <svg xmlns="http://www.w3.org" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                Novo Pagamento
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
                    <th>Usuário</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td className="text-muted">{p.user_email}</td>
                      <td className="font-weight-bold">${p.amount}</td>
                      <td>
                        <span className={`badge bg-${p.status === "paid" ? "success" : "warning"}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="text-muted">
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
    </Layout>
  )
}
