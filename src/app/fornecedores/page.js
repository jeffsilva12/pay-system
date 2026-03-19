"use client"

import { useState, useEffect } from "react"
import Layout from "@/app/components/Layout"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link"

export default function FornecedoresListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const [suppliers, setSuppliers] = useState([])

  useEffect(() => {
    async function loadSuppliers() {
      const res = await fetch("/api/fornecedores")
      const data = await res.json()
      setSuppliers(data)
    }
    loadSuppliers()
  }, [])

  return (
    <Layout>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">Gestão de Fornecedores</h2>
            </div>
            {/* BOTÃO PARA IR PARA O CADASTRO */}
            <div className="col-auto ms-auto d-print-none">
              <Link href="/fornecedores/cadastrar" className="btn btn-primary">
                <svg xmlns="http://www.w3.org" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                Novo Fornecedor
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="card">
            <div className="table-responsive">
              <table className="table table-vcenter card-table">
                <thead>
                  <tr>
                    <th>Razão Social</th>
                    <th>CNPJ</th>
                    <th className="w-1">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map(s => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td className="text-secondary">
                        {s.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")}
                      </td>
                      <td>
                        <button className="btn btn-ghost-info btn-sm">Editar</button>
                      </td>
                    </tr>
                  ))}
                  {suppliers.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center text-muted">Nenhum fornecedor cadastrado.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
