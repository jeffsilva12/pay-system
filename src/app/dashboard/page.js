"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/app/components/Layout";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);


  useEffect(() => {
    if (status !== "authenticated") return;

    async function loadDashboard() {
      const res = await fetch("/api/dashboard");

      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        setData(null);
      }

      setLoading(false);
    }

    loadDashboard();
  }, [status]);

  // ⏳ Loading da sessão
  if (status === "loading") {
    return (
      <Layout>
        <p>Verificando sessão...</p>
      </Layout>
    );
  }

  // ⏳ Loading dos dados
  if (loading) {
    return (
      <Layout>
        <p>Carregando dashboard...</p>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <p>Erro ao carregar dashboard</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <h2 className="page-title">Dashboard</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="page-body">
        <div className="container-xl">
          <div className="row row-deck row-cards">

            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="subheader">Fornecedores</div>
                  <div className="h1 mb-3">{data.suppliers}</div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="subheader">Usuários</div>
                  <div className="h1 mb-3">{data.users}</div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="subheader">Pagamentos Aprovados</div>
                  <div className="h1 mb-3">{data.paymentsApproved}</div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className="card">
                <div className="card-body">
                  <div className="subheader">Pagamentos Rejeitados</div>
                  <div className="h1 mb-3">{data.paymentsRejected}</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}