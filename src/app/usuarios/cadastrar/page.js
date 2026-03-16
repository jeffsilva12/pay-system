"use client"

import { useState } from "react"
import Sidebar from "@/app/components/Sidebar"

export default function UsersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user" // Exemplo de campo extra para CMS
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const res = await fetch("/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      alert("Usuário cadastrado com sucesso!")
      setFormData({ name: "", email: "", password: "", role: "user" })
    }
  }

  return (
    <div className="page">
      {/* Sidebar na lateral */}
      <Sidebar />

      <div className="page-wrapper">
        <div className="page-header d-print-none">
          <div className="container-xl">
            <h2 className="page-title">Cadastrar Novo Usuário</h2>
          </div>
        </div>

        <div className="page-body">
          <div className="container-xl">
            <div className="row justify-content-center">
              <div className="col-md-6">
                
                <form className="card" onSubmit={handleSubmit}>
                  <div className="card-status-top bg-primary"></div>
                  
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label required">Nome Completo</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Ex: João Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label required">Endereço de E-mail</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="joao@exemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label required">Senha</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Mínimo 6 caracteres"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required 
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Nível de Acesso</label>
                      <select 
                        className="form-select"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      >
                        <option value="user">Usuário Comum</option>
                        <option value="admin">Administrador</option>
                        <option value="editor">Editor</option>
                      </select>
                    </div>
                  </div>

                  <div className="card-footer text-end">
                    <button type="button" className="btn btn-link link-secondary" onClick={() => window.history.back()}>
                      Cancelar
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
      </div>
    </div>
  )
}
