"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faCreditCard,
  faBuilding,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { useSession } from "next-auth/react";
config.autoAddCss = false;

export default function Sidebar() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <aside className="navbar navbar-vertical navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar-menu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <h1 className="navbar-brand navbar-brand-autodark">
          <Link href="/dashboard" className="text-white text-decoration-none">
            Pay System
          </Link>
        </h1>

        <div className="collapse navbar-collapse" id="sidebar-menu">
          <ul className="navbar-nav pt-lg-3 d-flex flex-column h-100">

            {/* Link visível apenas para ADMIN */}
            {session?.user.role === "ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" href="/usuarios">
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    <FontAwesomeIcon icon={faUsers} style={{ width: "18px" }} />
                  </span>
                  <span className="nav-link-title">Usuários</span>
                </Link>
              </li>
            )}

            {/* Links visíveis apenas para REGISTRO ou ADMIN */}
            {(session?.user.role === "REGISTRO" || session?.user.role === "ADMIN") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/pagamentos">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <FontAwesomeIcon icon={faCreditCard} style={{ width: "18px" }} />
                    </span>
                    <span className="nav-link-title">Pagamentos</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/fornecedores">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                      <FontAwesomeIcon icon={faBuilding} style={{ width: "18px" }} />
                    </span>
                    <span className="nav-link-title">Fornecedores</span>
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item mt-auto">
              <a className="nav-link" href="#" onClick={handleLogout}>
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ width: "18px" }} />
                </span>
                <span className="nav-link-title">Sair</span>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </aside>
  );
}
