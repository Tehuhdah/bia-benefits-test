import React from "react";
import AdminLayout from "@/admin_dashboards/AdminLayout";
import BussinessList from "@/admin_dashboards/Super_admin/BIA/BussinessList";
import ProtectedPage from "@/components/ProtectedPage";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <ProtectedPage allowedRoles={["SUPER_ADMIN", "BIA"]}>
        <BussinessList />
      </ProtectedPage>
    </AdminLayout>
  );
};

export default AdminDashboard;
