import PagamentoForm from "./PagamentoForm";

export default function PagamentoModal({ open, onClose, pagamento, refresh }) {
  if (!open) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">

          <h5>{pagamento ? "Editar Pagamento" : "Novo Pagamento"}</h5>

          <PagamentoForm
            pagamento={pagamento}
            onSuccess={() => {
              refresh();
              onClose();
            }}
          />

          <button className="btn btn-secondary mt-3" onClick={onClose}>
            Fechar
          </button>

        </div>
      </div>
    </div>
  );
}
