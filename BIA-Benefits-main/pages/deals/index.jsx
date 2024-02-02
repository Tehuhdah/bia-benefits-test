import React from "react";
import AdminLayout from "@/admin_dashboards/AdminLayout";
import DealList from "@/admin_dashboards/Super_admin/Deals/DealList";
import ProtectedPage from "@/components/ProtectedPage";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <ProtectedPage allowedRoles={["SUPER_ADMIN"]}>
        <DealList />
      </ProtectedPage>
    </AdminLayout>
  );
};

export default AdminDashboard;
