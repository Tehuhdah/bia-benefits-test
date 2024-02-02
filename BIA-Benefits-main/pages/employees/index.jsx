import React from "react";
import AdminLayout from "@/admin_dashboards/AdminLayout";
import EmployeeList from "@/admin_dashboards/Super_admin/Business/EmployeeList";
import ProtectedPage from "@/components/ProtectedPage";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <ProtectedPage allowedRoles={["BUSINESS", "SUPER_ADMIN"]}>
        <EmployeeList />
      </ProtectedPage>
    </AdminLayout>
  );
};

export default AdminDashboard;
