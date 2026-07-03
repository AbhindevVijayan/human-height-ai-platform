import AdminLayout from "../../components/admin/AdminLayout";

import ModelCard from "../../components/admin/ModelCard";
import StatsCard from "../../components/admin/StatsCard";
import SystemCard from "../../components/admin/SystemCard";
import QuickActions from "../../components/admin/QuickActions";

function Dashboard() {

    return (

        <AdminLayout>

            <div className="space-y-10">

                <div>

                    <h1 className="text-5xl font-bold">

                        Admin Dashboard

                    </h1>

                    <p className="text-slate-500 mt-2">

                        MeasureWise AI Administration Console

                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-8">

                    <ModelCard />

                    <SystemCard />

                </div>

                <div>

                    <StatsCard />

                </div>

                <div>

                    <QuickActions />

                </div>

            </div>

        </AdminLayout>

    );

}

export default Dashboard;