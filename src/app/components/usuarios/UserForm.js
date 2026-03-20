import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function UserForm({ user, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "USER");
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = { name, email, role };

    let url = "/api/usuarios";
    let method = "POST";

    if (user) {
      url = `/api/usuarios/${user.id}`;
      method = "PUT";
    } else {
      payload.password = password;
    }

    const res = await fetch(url, {
      method,
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success("Usuário criado com sucesso!");
      onSuccess();
    } else {
      alert("Erro ao salvar usuário");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <input
          className="form-control"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-2">
        <input
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {!user && (
        <div className="mb-2">
          <input
            type="password"
            className="form-control"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      )}

      <div className="mb-3">
        <select
          className="form-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="AUTORIZACAO">AUTORIZACAO</option>
          <option value="REGISTRO">REGISTRO</option>
        </select>
      </div>

      <button className="btn btn-primary w-100">
        Salvar
      </button>
    </form>
  );
}