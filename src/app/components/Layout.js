"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="page page-center">
        <div className="container container-slim py-4">
          <div className="text-center">
            <div className="mb-3">
              <span className="spinner-border spinner-border-sm text-secondary" role="status"></span>
            </div>
            <div className="text-secondary">Carregando...</div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="page">
      {/* Menu Lateral */}
      <Sidebar />

      <div className="page-wrapper d-flex flex-column">
        {/* Cabeçalho Superior */}
        <Header />

        {/* Conteúdo da Página */}
        <main className="page-body">
          <div className="container-xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
