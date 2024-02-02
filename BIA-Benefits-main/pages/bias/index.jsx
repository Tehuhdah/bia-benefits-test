import AddBia from "../../admin_dashboards/Super_admin/BIA/AddBia";
import React from "react";
import AdminLayout from "@/admin_dashboards/AdminLayout";
import BiaList from "@/admin_dashboards/Super_admin/BiaList";
import ProtectedPage from "@/components/ProtectedPage";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <ProtectedPage allowedRoles={["SUPER_ADMIN"]}>
        <BiaList />
      </ProtectedPage>
    </AdminLayout>
  );
};

export default AdminDashboard;
