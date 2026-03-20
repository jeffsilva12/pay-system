import FornecedorForm from "./FornecedorForm";
import toast from "react-hot-toast";

export default function FornecedorModal({ open, onClose, fornecedor, refresh }) {
  if (!open) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">

          <h5>{fornecedor ? "Editar Fornecedor" : "Novo Fornecedor"}</h5>

          <FornecedorForm
            fornecedor={fornecedor}
            onSuccess={() => {
              toast.success("Fornecedor salvo com sucesso!");
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
