import React from "react";
import AdminLayout from "@/admin_dashboards/AdminLayout";
import AddDeals from "@/admin_dashboards/Super_admin/Deals/AddDeals";
import ProtectedPage from "@/components/ProtectedPage";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <ProtectedPage allowedRoles={["SUPER_ADMIN"]}>
        <AddDeals />
      </ProtectedPage>
    </AdminLayout>
  );
};

export default AdminDashboard;
