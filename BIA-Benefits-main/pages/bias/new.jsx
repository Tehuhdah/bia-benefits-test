import AddBia from "../../admin_dashboards/Super_admin/BIA/AddBia";
import React from "react";
import AdminLayout from "@/admin_dashboards/AdminLayout";
import ProtectedPage from "@/components/ProtectedPage";


const AdminDashboard = () => {
  return (
    <div>
      <AdminLayout>
      <ProtectedPage  allowedRoles={["SUPER_ADMIN"]}>  
        <AddBia />
        </ProtectedPage>
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;
