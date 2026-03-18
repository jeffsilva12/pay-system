"use client"

import { useEffect, useState } from "react"
import Layout from "@/app/components/Layout"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"

export default function PaymentsPage() {
  const [payments, setPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Busca a lista de pagamentos (certifique-se que a API traz o include: { supplier: true })
    fetch("/api/pagamentos")
      .then(res => res.json())
      .then(data => setPayments(data))
      .catch(err => console.error("Erro ao carregar pagamentos:", err))
  }, [])

  // Filtro que busca por Fornecedor, CNPJ ou Descrição
  const filteredPayments = payments.filter(p => {
    const search = searchTerm.toLowerCase()
    return (
      p.supplier?.name?.toLowerCase().includes(search) ||
      p.supplier?.cnpj?.includes(search.replace(/\D/g, "")) ||
      p.description?.toLowerCase().includes(search)
    )
  })

  return (
    <Layout>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">Gestão de Pagamentos</h2>
            </div>
            <div className="col-auto ms-auto">
              <Link href="/pagamentos/cadastrar" className="btn btn-primary">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                Novo Registro
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          
          {/* Barra de Busca */}
          <div className="mb-3">
            <div className="input-icon">
              <span className="input-icon-addon">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar por fornecedor, CNPJ ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="card">
            <div className="table-responsive">
              <table className="table table-vcenter card-table table-striped">
                <thead>
                  <tr>
                    <th>Fornecedor</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th className="w-1"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <div className="font-weight-medium">{p.supplier?.name || "Não informado"}</div>
                        <div className="text-muted small">
                          {p.supplier?.cnpj?.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")}
                        </div>
                      </td>
                      <td className="text-muted">{p.description}</td>
                      <td className="text-nowrap font-weight-bold">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.amount)}
                      </td>
                      <td>
                        <span className={`badge ${
                          p.status === "APROVADO" ? "bg-success-lt" : 
                          p.status === "REJEITADO" ? "bg-danger-lt" : "bg-warning-lt"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="text-muted">
                        {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td>
                        <Link href={`/pagamentos/${p.id}`} className="btn btn-ghost-primary btn-sm">
                          Detalhes
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {filteredPayments.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        Nenhum pagamento encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
