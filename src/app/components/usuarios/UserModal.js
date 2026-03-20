import UserForm from "./UserForm";

export default function UserModal({ open, onClose, user, refresh }) {
  if (!open) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">

          <h5>{user ? "Editar Usuário" : "Novo Usuário"}</h5>

          <UserForm
            user={user}
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