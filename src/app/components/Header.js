"use client";
import { signOut } from "next-auth/react";

export default function Header() {
  const handleLogout = async (e) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.removeItem('token');

    }

    await signOut({ 
      callbackUrl: '/login',
      redirect: true 
    });
  };

  return (
    <header className="navbar navbar-expand-md navbar-light d-none d-lg-flex d-print-none border-bottom bg-white">
      <div className="container-xl">
        <div className="navbar-nav flex-row order-md-last ms-auto">
          <div className="nav-item">
            <button 
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2"
            >
              <svg xmlns="http://www.w3.org" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
