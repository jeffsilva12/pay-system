"use client"

import { useState } from "react"
import Layout from "@/app/components/Layout"

export default function PagamentosPage() {
  const [formData, setFormData] = useState({
    cliente: "",
    valor: "",
    descricao: "",
    status: "pendente",
    data_pagamento: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const valorTratado = typeof formData.valor === 'string' 
      ? parseFloat(formData.valor.replace(",", ".")) 
      : formData.valor;

    const res = await fetch("/api/pagamentos/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, valor: valorTratado })
    })

    if (res.ok) {
      alert("Pagamento registrado com sucesso!")
      setFormData({ 
        cliente: "", 
        valor: "", 
        descricao: "", 
        status: "pendente", 
        data_pagamento: new Date().toISOString().split('T')[0] 
      })
    }
  }

  return (
    <Layout>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <h2 className="page-title">Registrar Novo Pagamento</h2>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="row justify-content-center">
            <div className="col-md-6">
              
              <form className="card" onSubmit={handleSubmit}>
                <div className="card-status-top bg-green"></div>
                
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label required">Cliente / Beneficiário</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Nome do cliente ou empresa"
                      value={formData.cliente}
                      onChange={(e) => setFormData({...formData, cliente: e.target.value})}
                      required 
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label required">Valor (R$)</label>
                        <div className="input-group">
                          <span className="input-group-text">R$</span>
                          <input 
                            type="number" 
                            step="0.01"
                            className="form-control" 
                            placeholder="0,00"
                            value={formData.valor}
                            onChange={(e) => setFormData({...formData, valor: e.target.value})}
                            required 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label required">Data</label>
                        <input 
                          type="date" 
                          className="form-control" 
                          value={formData.data_pagamento}
                          onChange={(e) => setFormData({...formData, data_pagamento: e.target.value})}
                          required 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descrição / Observações</label>
                    <textarea 
                      className="form-control" 
                      rows="3"
                      placeholder="Detalhes do pagamento..."
                      value={formData.descricao}
                      onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status do Pagamento</label>
                    <div className="form-selectgroup">
                      <label className="form-selectgroup-item">
                        <input type="radio" name="status" value="pendente" className="form-selectgroup-input" 
                          checked={formData.status === "pendente"} 
                          onChange={(e) => setFormData({...formData, status: e.target.value})} 
                        />
                        <span className="form-selectgroup-label">Pendente</span>
                      </label>
                      <label className="form-selectgroup-item">
                        <input type="radio" name="status" value="aprovado" className="form-selectgroup-input" 
                          checked={formData.status === "aprovado"} 
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                        />
                        <span className="form-selectgroup-label text-success">Aprovado</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="card-footer text-end">
                  <button type="button" className="btn btn-link link-secondary" onClick={() => window.history.back()}>
                    Voltar
                  </button>
                  <button type="submit" className="btn btn-success ms-auto">
                    Salvar
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
