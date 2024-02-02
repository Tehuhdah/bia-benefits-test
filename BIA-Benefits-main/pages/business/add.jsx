import React from "react";
import ProtectedPage from "@/components/ProtectedPage";
import AddBusiness from "@/admin_dashboards/Super_admin/BIA/AddBusiness";
import AdminLayout from "@/admin_dashboards/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <ProtectedPage  allowedRoles={["BIA", "SUPER_ADMIN"]}>  
      <AddBusiness />
      </ProtectedPage>
    </AdminLayout>
  );
};

export default AdminDashboard;
