"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/app/components/Layout";
import toast, { Toaster } from "react-hot-toast";

// Importando componentes de gráfico
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    async function loadDashboard() {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const json = await res.json();
          setData(json);

        if (json.hasRejectedPayment) {
          const alreadyShown = localStorage.getItem("rejectedToastShown");

          if (!alreadyShown) {
            toast.error("Você possui pagamentos rejeitados!");
            localStorage.setItem("rejectedToastShown", "true");
          }
        }
        }
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [status]);

  if (status === "loading" || loading) {
    return <Layout><div className="container-xl p-5 text-center">Carregando...</div></Layout>;
  }

  if (!data) return <Layout><p>Erro ao carregar dados.</p></Layout>;

  // Dados formatados para os gráficos
  const chartData = [
    { name: 'Aprovados', value: data.paymentsApproved, color: '#2fb344' },
    { name: 'Pendentes', value: data.paymentsPending || 0, color: '#f59f00' },
    { name: 'Rejeitados', value: data.paymentsRejected, color: '#d63939' },
  ];

  return (
    <Layout>
        <Toaster position="top-right" />

        <div className="page-header d-print-none">
        <div className="container-xl">
          <h2 className="page-title">Visão Geral</h2>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          {/* CARDS DE RESUMO */}
          <div className="row row-cards mb-4">
            <div className="col-sm-6 col-lg-3">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="subheader">Pagamentos Pendentes</div>
                  <div className="h1 text-warning">{data.paymentsPending || 0}</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="subheader">Aprovados</div>
                  <div className="h1 text-success">{data.paymentsApproved}</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="subheader">Fornecedores</div>
                  <div className="h1">{data.suppliers}</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card card-sm">
                <div className="card-body">
                  <div className="subheader">Usuários</div>
                  <div className="h1">{data.users}</div>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO DE GRÁFICOS */}
          <div className="row row-cards">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Status de Pagamentos</h3>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">Volume por Categoria</h3>
                  <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="value" fill="#206bc4" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
