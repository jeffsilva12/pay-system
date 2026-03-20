"use client";

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import toast from "react-hot-toast";

export default function FornecedorTable({ fornecedores, onEdit, refresh }) {
  const [search, setSearch] = useState("");

  async function handleDelete(id) {
    const confirmDelete = confirm("Deseja excluir este fornecedor?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/fornecedores/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Fornecedor deletado com sucesso!");
      refresh();
    } else {
      alert("Erro ao excluir");
    }
  }

  // 🔍 FILTRO
  const filteredFornecedores = fornecedores.filter((f) => {
    const matchesSearch =
      f.name?.toLowerCase().includes(search.toLowerCase()) ||
      f.cnpj?.includes(search);

    return matchesSearch;
  });

  return (
    <div className="card">
      <div className="card-body">

        {/* 🔎 FILTRO */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nome ou CNPJ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-vcenter card-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th className="w-1">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredFornecedores.map((fornecedor) => (
                <tr key={fornecedor.id}>
                  <td>{fornecedor.name}</td>
                  <td className="text-muted">{fornecedor.cnpj}</td>

                  <td>
                    <div className="btn-list flex-nowrap">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => onEdit(fornecedor)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} className="me-1" />
                        Editar
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(fornecedor.id)}
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

      </div>
    </div>
  );
}