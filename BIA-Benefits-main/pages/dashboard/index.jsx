import React from "react";
import "tailwindcss/tailwind.css";
import AdminLayout from "@/admin_dashboards/AdminLayout";
import ProtectedPage from "@/components/ProtectedPage";
import MembershipCard from "@/admin_dashboards/MembershipCard";
import { useSession } from "next-auth/react";
import DashboardCard from "@/admin_dashboards/DashboardCard";

const Home = () => {
  const { data: session } = useSession();

  return (
    <AdminLayout>
      <ProtectedPage>
        {session && session.user && (
          <>
            {session.user.role === "SUPER_ADMIN" && <DashboardCard />}

            {session.user.role === "BIA" && session.user.bia && (
              <>
                <h4>Logged in as BIA</h4>
                <MembershipCard
                  name={session.user.name}
                  uniqueId={session.user.bia.uniqueId}
                />
              </>
            )}
            {session.user.role === "BUSINESS" && (
              <>
                <h4>Logged in as Business</h4>
                <MembershipCard
                  name={session.user.name}
                  uniqueId={session.user.business.uniqueId}
                />
              </>
            )}
          </>
        )}
      </ProtectedPage>
    </AdminLayout>
  );
};

export default Home;
