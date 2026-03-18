"use client"

import { useState, useEffect, useRef } from "react"
import Layout from "@/app/components/Layout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faCheckCircle, faBuilding } from "@fortawesome/free-solid-svg-icons"

export default function PagamentosPage() {
  const [suppliers, setSuppliers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [selectedSupplier, setSelectedSupplier] = useState(null)
  const dropdownRef = useRef(null) // Para fechar ao clicar fora
  
  const [formData, setFormData] = useState({
    supplierId: "",
    valor: "",
    descricao: ""
  })

  useEffect(() => {
    async function loadSuppliers() {
      const res = await fetch("/api/fornecedores")
      const data = await res.json()
      setSuppliers(data)
    }
    loadSuppliers()

    // Fecha o dropdown se clicar fora dele
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.cnpj.includes(searchTerm.replace(/\D/g, ""))
  )

  const handleSelectSupplier = (s) => {
    setSelectedSupplier(s)
    setFormData({ ...formData, supplierId: s.id })
    setSearchTerm(`${s.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")} - ${s.name}`)
    setShowResults(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.supplierId) return alert("Selecione um fornecedor da lista!")

    const payload = {
      supplierId: parseInt(formData.supplierId),
      amount: parseFloat(formData.valor),
      description: formData.descricao,
    }

    const res = await fetch("/api/pagamentos/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      alert("Pagamento registrado com sucesso!")
      setFormData({ supplierId: "", valor: "", descricao: "" })
      setSearchTerm("")
      setSelectedSupplier(null)
    }
  }

  return (
    <Layout>
      <div className="page-body">
        <div className="container-xl">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form className="card shadow-sm" onSubmit={handleSubmit} style={{ overflow: 'visible' }}>
                <div className="card-status-top bg-primary"></div>
                <div className="card-body" style={{ overflow: 'visible' }}>
                  <h3 className="card-title mb-4">Registrar Pagamento</h3>

                  {/* BUSCA DE FORNECEDOR */}
                  <div className="mb-3 position-relative" ref={dropdownRef}>
                    <label className="form-label required">Fornecedor</label>
                    <div className="input-icon">
                      <span className="input-icon-addon">
                        <FontAwesomeIcon 
                          icon={selectedSupplier ? faCheckCircle : faSearch} 
                          className={selectedSupplier ? "text-success" : ""} 
                        />
                      </span>
                      <input 
                        type="text"
                        className={`form-control ${selectedSupplier ? "is-valid" : ""}`}
                        placeholder="Busque por CNPJ ou Nome..."
                        value={searchTerm}
                        onFocus={() => setShowResults(true)}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          setSelectedSupplier(null)
                          setShowResults(true)
                        }}
                        autoComplete="off"
                        required
                      />
                    </div>

                    {/* DROPDOWN MELHORADO */}
                    {showResults && searchTerm.length > 0 && (
                      <div 
                        className="list-group position-absolute w-100 shadow-lg border" 
                        style={{ 
                          zIndex: 9999, 
                          maxHeight: '220px', 
                          overflowY: 'auto',
                          top: '100%', // Cola logo abaixo do input
                          left: 0,
                          backgroundColor: 'white' // Garante que não seja transparente
                        }}
                      >
                        {filteredSuppliers.length > 0 ? (
                          filteredSuppliers.map(s => (
                            <button
                              key={s.id}
                              type="button"
                              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2"
                              onClick={() => handleSelectSupplier(s)}
                              style={{ borderLeft: 0, borderRight: 0 }}
                            >
                              <div>
                                <div className="font-weight-bold">{s.name}</div>
                                <div className="text-muted small">
                                  {s.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")}
                                </div>
                              </div>
                              <FontAwesomeIcon icon={faBuilding} className="text-muted opacity-25" />
                            </button>
                          ))
                        ) : (
                          <div className="list-group-item text-center text-muted">
                            Nenhum fornecedor encontrado
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label required">Valor do Pagamento</label>
                    <div className="input-group">
                      <span className="input-group-text">R$</span>
                      <input 
                        type="number" step="0.01" className="form-control" 
                        placeholder="0,00"
                        value={formData.valor}
                        onChange={(e) => setFormData({...formData, valor: e.target.value})}
                        required 
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label required">Descrição do Serviço</label>
                    <textarea 
                      className="form-control" rows="3"
                      placeholder="Ex: Consultoria técnica mensal..."
                      value={formData.descricao}
                      onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="card-footer text-end">
                  <button type="submit" className="btn btn-primary">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
