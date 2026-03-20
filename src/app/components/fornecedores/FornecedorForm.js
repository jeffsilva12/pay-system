"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Máscara CNPJ
const formatCNPJ = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d{3})(\d)/, ".$1.$2/$3")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .substring(0, 18);
};

// Validador CNPJ
const isValidCNPJ = (cnpj) => {
  const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const c = cnpj.replace(/[^\d]/g, "");

  if (
    c.length !== 14 ||
    /0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}/.test(c)
  ) {
    return false;
  }

  // Primeiro dígito verificador
  let n = 0;
  for (let i = 0; i < 12; i++) {
    n += c[i] * b[i + 1];
  }
  if (c[12] != ((n %= 11) < 2 ? 0 : 11 - n)) return false;

  // Segundo dígito verificador
  n = 0;
  for (let i = 0; i <= 12; i++) {
    n += c[i] * b[i];
  }
  if (c[13] != ((n %= 11) < 2 ? 0 : 11 - n)) return false;

  return true;
};

export default function FornecedorForm({ fornecedor, onSuccess }) {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");

  useEffect(() => {
    if (fornecedor) {
      setName(fornecedor.name || "");
      setCnpj(formatCNPJ(fornecedor.cnpj || ""));
    }
  }, [fornecedor]);

  const cnpjIsValid = cnpj ? isValidCNPJ(cnpj) : null;

  async function handleSubmit(e) {
    e.preventDefault();

    if (cnpj && !isValidCNPJ(cnpj)) {
      return toast.error("CNPJ inválido!");
    }

    const payload = {
      name,
      cnpj: cnpj.replace(/\D/g, ""),
    };

    let url = "/api/fornecedores";
    let method = "POST";

    if (fornecedor) {
      url = `/api/fornecedores/${fornecedor.id}`;
      method = "PUT";
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      toast.success(
        fornecedor ? "Fornecedor atualizado!" : "Fornecedor criado!"
      );
      onSuccess();
    } else {
      toast.error("Erro ao salvar fornecedor");
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
          className={`form-control ${
            cnpj
              ? cnpjIsValid
                ? "is-valid"
                : "is-invalid"
              : ""
          }`}
          placeholder="CNPJ"
          value={cnpj}
          onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
          maxLength={18}
        />

        {cnpj && !cnpjIsValid && (
          <div className="invalid-feedback d-block">
            CNPJ inválido
          </div>
        )}

        {cnpj && cnpjIsValid && (
          <div className="valid-feedback d-block">
            CNPJ válido
          </div>
        )}
      </div>

      <button className="btn btn-primary w-100">
        Salvar
      </button>
    </form>
  );
}