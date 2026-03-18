"use client"

import { useState } from "react"
import Layout from "@/app/components/Layout"
import { useRouter } from "next/navigation"

export default function NovoFornecedorPage() {
  const [name, setName] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Função para validar o algoritmo do CNPJ
  const validarCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, '')
    if (cnpj === '' || cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false
    
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho)
    let digitos = cnpj.substring(tamanho)
    let soma = 0
    let pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--
      if (pos < 2) pos = 9
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado != digitos.charAt(0)) return false
    
    tamanho = tamanho + 1
    numeros = cnpj.substring(0, tamanho)
    soma = 0
    pos = tamanho - 7
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--
      if (pos < 2) pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11)
    if (resultado != digitos.charAt(1)) return false
    return true
  }

  // Máscara que reconstrói o padrão a cada dígito
  const handleCnpjChange = (e) => {
    let v = e.target.value.replace(/\D/g, "") // Pega só números
    
    if (v.length > 14) v = v.substring(0, 14) // Trava em 14 dígitos

    // Aplica a máscara forçada
    if (v.length > 12) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5")
    else if (v.length > 8) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4}).*/, "$1.$2.$3/$4")
    else if (v.length > 5) v = v.replace(/^(\d{2})(\d{3})(\d{1,3}).*/, "$1.$2.$3")
    else if (v.length > 2) v = v.replace(/^(\d{2})(\d{1,3}).*/, "$1.$2")
    
    setCnpj(v)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    
    if (!validarCNPJ(cnpj)) {
      alert("O CNPJ digitado é inválido. Verifique os números.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/fornecedores/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          cnpj: cnpj.replace(/\D/g, "") 
        })
      })

      if (res.ok) {
        alert("Fornecedor cadastrado!")
        router.push("/fornecedores")
      } else {
        const data = await res.json()
        alert(data.error || "Este CNPJ já está cadastrado.")
      }
    } catch (err) {
      alert("Erro ao conectar com o servidor.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="page-body">
        <div className="container-xl">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form className="card shadow-sm" onSubmit={handleSave}>
                <div className="card-status-top bg-primary"></div>
                <div className="card-header">
                  <h3 className="card-title">Novo Fornecedor</h3>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label required">Razão Social</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Ex: Nome da Empresa LTDA"
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label required">CNPJ</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="00.000.000/0000-00" 
                      value={cnpj} 
                      onChange={handleCnpjChange}
                      autoComplete="off"
                      required 
                    />
                  </div>
                </div>
                <div className="card-footer d-flex">
                  <button type="button" className="btn btn-link link-secondary" onClick={() => router.back()}>
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary ms-auto"
                    disabled={loading}
                  >
                    {loading ? "Processando..." : "Salvar"}
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
