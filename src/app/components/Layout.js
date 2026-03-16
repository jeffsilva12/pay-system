import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ children }) {
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
