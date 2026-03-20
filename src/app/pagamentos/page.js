"use client";

import { useEffect, useState } from "react";
import PagamentoTable from "@/app/components/pagamentos/PagamentoTable";
import PagamentoModal from "@/app/components/pagamentos/PagamentoModal";
import Layout from "@/app/components/Layout";
// Trocado para Tabler Icons para consistência visual
import { IconPlus } from "@tabler/icons-react";

export default function PagamentosPage() {
  const [pagamentos, setPagamentos] = useState([]);
  const [selectedPagamento, setSelectedPagamento] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  async function loadPagamentos() {
    try {
      const res = await fetch("/api/pagamentos");
      const data = await res.json();
      setPagamentos(data);
    } catch (error) {
      console.error("Erro ao carregar pagamentos:", error);
    }
  }

  useEffect(() => {
    loadPagamentos();
  }, []);

  function handleEdit(pagamento) {
    setSelectedPagamento(pagamento);
    setOpenModal(true);
  }

  function handleCreate() {
    // Agora abre o modal em vez de redirecionar, igual à página de usuários
    setSelectedPagamento(null);
    setOpenModal(true);
  }

  return (
    <Layout>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="page-title">Pagamentos</h2>

            <button className="btn btn-primary" onClick={handleCreate}>
              <IconPlus size={18} className="me-2" />
              Novo Pagamento
            </button>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <PagamentoTable
              pagamentos={pagamentos}
              onEdit={handleEdit}
              refresh={loadPagamentos}
            />
          </div>

          <PagamentoModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            pagamento={selectedPagamento}
            refresh={loadPagamentos}
          />
        </div>
      </div>
    </Layout>
  );
}
