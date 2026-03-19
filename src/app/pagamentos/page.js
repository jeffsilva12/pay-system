"use client"

import { useEffect, useState } from "react"
import Layout from "@/app/components/Layout"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PaymentsPage() {
  const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/login");
      }
    }, [status, router]);

  const [payments, setPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [reason, setReason] = useState(""); // Motivo da rejeição

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

  const handleAction = async (status) => {
    console.log(status);
    
    if (status === 'REJECTED' && !reason) {
      alert("Por favor, informe o motivo da rejeição.");
      return;
    }

    try {
      const response = await fetch('/api/pagamentos/atualizar-status', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedPayment.id,
          status: status,
          motivo: reason
        }),
      });

      if (response.ok) {
        alert(`Pagamento ${status === 'AUTORIZADO' ? 'autorizado' : 'rejeitado'} com sucesso!`);
        // Opcional: recarregar a página ou atualizar o estado local para refletir a mudança
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert("Erro: " + errorData.error);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setSelectedPayment(null);
      setReason("");
    }
  };



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
                        <span className={`badge ${p.status === "AUTORIZADO" ? "bg-success-lt" :
                          p.status === "REJEITADO" ? "bg-danger-lt" : "bg-warning-lt"
                          }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="text-muted">
                        {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                      <td>
                        <button
                          onClick={() => setSelectedPayment(p)}
                          className="btn btn-ghost-primary btn-sm"
                        >
                          Detalhes
                        </button>
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

      {selectedPayment && (
        <div className="modal-overlay"> {/* Estilize para cobrir a tela */}
          <div className="modal-content p-4 bg-white rounded shadow">
            <h3>Detalhes do Pagamento #{selectedPayment.id}</h3>
            <p><strong>Valor:</strong> R$ {selectedPayment.amount}</p>
            {/* Adicione outros campos como supplier, createdBy, etc. */}

            <hr />

            <div className="mb-3">
              <label>Motivo da Rejeição (se aplicável):</label>
              <textarea
                className="form-control"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-danger" onClick={() => handleAction('REJEITADO')}>
                Rejeitar
              </button>
              <button className="btn btn-success" onClick={() => handleAction('AUTORIZADO')}>
                Autorizar
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedPayment(null)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </Layout>
  )
}
