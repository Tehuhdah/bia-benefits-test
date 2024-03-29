import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles
import AdminLayout from "@/admin_dashboards/AdminLayout";
import ProtectedPage from "@/components/ProtectedPage";

function EmployeeDetails() {
  const [employee, setEmployee] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [success, setSuccess] = useState(null);
  const [biaName, setBiaName] = useState(null);
  const [updateSuccess, setupdateSuccess] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          // Fetch employee data
          const employeeResponse = await fetch(`/api/employees/${id}`);
          if (employeeResponse.ok) {
            const employeeData = await employeeResponse.json();
            setEmployee(employeeData);

            // Fetch business data
            const businessResponse = await fetch(
              `/api/business/${employeeData.business.id}`
            );
            if (businessResponse.ok) {
              const businessData = await businessResponse.json();
              setBusinessData(businessData);

              // Fetch BIA data
              const biaResponse = await fetch(
                `/api/bias/${businessData.biaId}`
              );
              if (biaResponse.ok) {
                const biaData = await biaResponse.json();
                setBiaName(biaData.nameOfBia);
                console.log("bia name", biaData.nameOfBia);
              } else {
                console.error("Failed to fetch BIA data:", biaResponse);
                throw new Error("Failed to fetch BIA data");
              }
            } else {
              console.error("Failed to fetch Business data:", businessResponse);
              throw new Error("Failed to fetch Business data");
            }
          } else {
            console.error("Failed to fetch Employee data:", employeeResponse);
            throw new Error("Failed to fetch Employee data");
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
      const { success, updateSuccess } = router.query;
      if (success) {
        setSuccess(success);
        const timer = setTimeout(() => {
          setSuccess(null);
        }, 5000);
        return () => clearTimeout(timer);
      }
      if (updateSuccess) {
        setUpdateSuccess(updateSuccess);
        const timer = setTimeout(() => {
          setUpdateSuccess(null);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [id, router.query.success, router.query.updateSuccess]);

  return (
    <AdminLayout>
      <ProtectedPage allowedRoles={["SUPER_ADMIN", "BIA", "BUSINESS"]}>
        <div className="overflow-x-auto">
          <div className="text-sm breadcrumbs">
            <ul>
              <li>
                <Link className="font-bold" href={"/bias/"}>
                  BIA's
                </Link>
              </li>
              <li>
                {biaName && (
                  <Link
                    className="font-bold"
                    href={`/bias/${businessData.biaId}`}
                  >
                    {biaName}
                  </Link>
                )}
              </li>

              <li>
                {employee?.business && (
                  <Link
                    className="font-bold"
                    href={`/business/${employee.business.id}`}
                  >
                    {employee.business.name}
                  </Link>
                )}
              </li>
              <li className="font-bold" key={employee?.id}>
                {employee?.first_name}
              </li>
            </ul>
          </div>
          <div className="flex justify-end mt-3">
            <Link
              className=" btn btn-primary"
              href={{
                pathname: "/employees/new",
                query: { businessId: employee?.business?.id },
              }}
            >
              Add Employee
            </Link>
          </div>
          {success && <div className="alert alert-success mb-4">{success}</div>}
          {updateSuccess && (
            <div className="alert alert-success mb-4">{updateSuccess}</div>
          )}
          {employee ? (
            <div className="bg-white overflow-hidden shadow rounded-lg border mt-4 p-6">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Employee Details
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Information about the employee.
                </p>
              </div>

              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Employee Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {employee ? employee.first_name : "Loading..."}
                    </dd>
                  </div>

                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Contact Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {employee ? employee.phone : "N/A"}
                    </dd>
                  </div>

                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Business
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {employee?.business?.name || "N/A"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 text-xl font-semibold">
              Loading Employee details...
            </p>
          )}
        </div>
      </ProtectedPage>
    </AdminLayout>
  );
}

export default EmployeeDetails;
