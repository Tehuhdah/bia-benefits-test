import React from "react";
import BiaAdminLayout from "@/admin_dashboards/BiaADminLayout";
import BusList from "@/admin_dashboards/Super_admin/BIA/BussinessList";

const AdminDashboard = () => {
  return (
    <div>
      <BiaAdminLayout>
        <BusList />
      </BiaAdminLayout>
    </div>
  );
};

export default AdminDashboard;
