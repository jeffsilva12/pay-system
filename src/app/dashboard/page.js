import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Layout from "@/app/components/Layout";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <Layout>
      {/* O page-header e o page-body agora são o "children" do layout */}
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
            <div className="col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body">
                  <div className="subheader">Total Payments</div>
                  <div className="h1 mb-3">$2,450</div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-4">
              <div className="card">
                <div className="card-body">
                  <div className="subheader">Users</div>
                  <div className="h1 mb-3">124</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
