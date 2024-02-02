import React from "react";
import AdminLayout from "@/admin_dashboards/AdminLayout";
import Bus from "@/admin_dashboards/Super_admin/BIA/Bus";

const AdminDashboard = () => {
  return (
    <div>
      <AdminLayout>
        <Bus />
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;
