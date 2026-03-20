import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function PagamentoForm({ pagamento, onSuccess }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [status, setStatus] = useState("PENDENTE");
  

  useEffect(() => {
    async function fetchSuppliers() {
      const res = await fetch("/api/fornecedores");
      const data = await res.json();
      setSuppliers(data);
    }
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (pagamento) {
      setDescription(pagamento.description || "");
      setAmount(pagamento.amount || "");
      setSupplierId(pagamento.supplierId || "");
      setStatus(pagamento.status || "PENDENTE");
    }
  }, [pagamento]);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = { description, amount: parseFloat(amount), supplierId: parseInt(supplierId), status };

    let url = "/api/pagamentos";
    let method = "POST";

    if (pagamento) {
      url = `/api/pagamentos/${pagamento.id}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("Pagamento criado com sucesso!");
      onSuccess();
    } else {
      alert("Erro ao salvar pagamento");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <input
          className="form-control"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <input
          type="number"
          className="form-control"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <select
          className="form-select"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
          required
        >
          <option value="">Selecione um fornecedor</option>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </div>
      
      {pagamento && (
        <div className="mb-3">
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="PENDENTE">PENDENTE</option>
          <option value="AUTORIZADO">AUTORIZADO</option>
          <option value="REJEITADO">REJEITADO</option>
        </select>
      </div>
      )}


      <button className="btn btn-primary w-100">
        Salvar
      </button>
    </form>
  );
}
