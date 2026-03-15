export default function DashboardLayout({ children }) {
  return (
    <div className="page">
      
      <aside className="navbar navbar-vertical navbar-expand-lg">
        <div className="container-fluid">
          <h1 className="navbar-brand">Pay System</h1>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">
                Dashboard
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/dashboard/users">
                Usuários
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/dashboard/payments">
                Pagamentos
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="page-wrapper">
        <div className="page-header">
          <h2 className="page-title">Dashboard</h2>
        </div>

        <div className="page-body">
          <div className="container-xl">
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}