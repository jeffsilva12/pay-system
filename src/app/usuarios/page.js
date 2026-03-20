"use client";

import { useEffect, useState } from "react";
import UserTable from "@/app/components/usuarios/UserTable";
import UserModal from "@/app/components/usuarios/UserModal";
import Layout from "@/app/components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons"

export default function UsuariosPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  async function loadUsers() {
    const res = await fetch("/api/usuarios");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function handleEdit(user) {
    setSelectedUser(user);
    setOpenModal(true);
  }

  function handleCreate() {
    setSelectedUser(null);
    setOpenModal(true);
  }

  return (
    <Layout>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="page-title">Usuários</h2>

            <button className="btn btn-primary" onClick={handleCreate}>
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              Novo Usuário
            </button>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">

          <UserTable
            users={users}
            onEdit={handleEdit}
            refresh={loadUsers}
          />

          <UserModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            user={selectedUser}
            refresh={loadUsers}
          />

        </div>
      </div>
    </Layout>
  );
}