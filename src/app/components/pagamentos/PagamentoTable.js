"use client";

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function PagamentoTable({ pagamentos, onEdit, refresh }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  async function handleDelete(id) {
    if (!confirm("Deseja excluir este pagamento?")) return;

    const res = await fetch(`/api/pagamentos/${id}`, { method: "DELETE" });

    if (res.ok) {
      refresh();
    } else {
      alert("Erro ao excluir");
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "AUTORIZADO":
        return <span className="badge bg-success-lt">Autorizado</span>;
      case "PENDENTE":
        return <span className="badge bg-warning-lt">Pendente</span>;
      case "REJEITADO":
        return <span className="badge bg-danger-lt">Rejeitado</span>;
      default:
        return <span className="badge bg-secondary-lt">{status}</span>;
    }
  };

  // 🔍 FILTRO
  const filteredPagamentos = pagamentos.filter((p) => {
    const matchesSearch =
      p.description?.toLowerCase().includes(search.toLowerCase()) ||
      p.supplier?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter
      ? p.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="table-responsive">

      {/* 🔎 FILTROS */}
      <div className="mb-3 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por descrição ou fornecedor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todos status</option>
          <option value="PENDENTE">Pendente</option>
          <option value="AUTORIZADO">Autorizado</option>
          <option value="REJEITADO">Rejeitado</option>
        </select>
      </div>

      <table className="table table-vcenter card-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Fornecedor</th>
            <th>Data</th>
            <th>Status</th>
            <th className="w-1">Ações</th>
          </tr>
        </thead>

        <tbody>
          {filteredPagamentos.map((pagamento) => (
            <tr key={pagamento.id}>
              <td>{pagamento.description}</td>

              <td className="text-muted">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(pagamento.amount)}
              </td>

              <td>{pagamento.supplier?.name || "N/A"}</td>

              <td className="text-muted">
                {new Date(pagamento.createdAt).toLocaleDateString('pt-BR')}
              </td>

              <td>{getStatusBadge(pagamento.status)}</td>

              <td>
                <div className="btn-list flex-nowrap">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(pagamento)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} className="me-1" />
                    Editar
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(pagamento.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-1" />
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}