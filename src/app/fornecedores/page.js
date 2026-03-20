"use client";

import { useEffect, useState } from "react";
import FornecedorTable from "@/app/components/fornecedores/FornecedorTable";
import FornecedorModal from "@/app/components/fornecedores/FornecedorModal";
import Layout from "@/app/components/Layout";
// Usando Tabler Icons para evitar erros de fonte
import { IconPlus } from "@tabler/icons-react";

export default function FornecedoresPage() {
  const [fornecedores, setFornecedores] = useState([]);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  async function loadFornecedores() {
    try {
      const res = await fetch("/api/fornecedores");
      const data = await res.json();
      setFornecedores(data);
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
    }
  }

  useEffect(() => {
    loadFornecedores();
  }, []);

  function handleEdit(fornecedor) {
    setSelectedFornecedor(fornecedor);
    setOpenModal(true);
  }

  function handleCreate() {
    // Ajustado para abrir modal e resetar seleção (padrão que você pediu)
    setSelectedFornecedor(null);
    setOpenModal(true);
  }

  return (
    <Layout>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="page-title">Fornecedores</h2>

            <button className="btn btn-primary" onClick={handleCreate}>
              <IconPlus size={18} className="me-2" />
              Novo Fornecedor
            </button>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          {/* Adicionado o card envolta da tabela para manter o estilo do Tabler */}
          <div className="card">
            <FornecedorTable
              fornecedores={fornecedores}
              onEdit={handleEdit}
              refresh={loadFornecedores}
            />
          </div>

          <FornecedorModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            fornecedor={selectedFornecedor}
            refresh={loadFornecedores}
          />
        </div>
      </div>
    </Layout>
  );
}
