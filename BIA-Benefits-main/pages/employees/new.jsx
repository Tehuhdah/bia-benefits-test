import React from "react";
import AdminLayout from "@/admin_dashboards/AdminLayout";
import ProtectedPage from "@/components/ProtectedPage";
import AddEmployees from "@/admin_dashboards/Super_admin/Business/AddEmployees";

const AdminDashboard = () => {
  return (
    <AdminLayout>

      <ProtectedPage allowedRoles={["BUSINESS", "SUPER_ADMIN"]}>
        <AddEmployees />
      </ProtectedPage>

    </AdminLayout>

  );
};

export default AdminDashboard;
