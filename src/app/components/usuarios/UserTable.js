"use client";

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function UserTable({ users, onEdit, refresh }) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  async function handleDelete(id) {
    const confirmDelete = confirm("Deseja excluir este usuário?");
    if (!confirmDelete) return;

    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      refresh();
    } else {
      alert("Erro ao excluir");
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter
      ? user.role === roleFilter
      : true;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="card">
      <div className="card-body">

        {/* 🔎 FILTROS */}
        <div className="mb-3 d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">Todos perfis</option>
            <option value="ADMIN">Admin</option>
            <option value="REGISTRO">Registro</option>
            <option value="AUTORIZACAO">Autorização</option>            
          </select>
        </div>

        <div className="table-responsive">
          <table className="table table-vcenter card-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Perfil</th>
                <th className="w-1">Ações</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td className="text-muted">{user.email}</td>
                  <td>{user.role}</td>

                  <td>
                    <div className="btn-list flex-nowrap">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => onEdit(user)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} className="me-1" />
                        Editar
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(user.id)}
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