import React from "react";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { useSession } from "next-auth/react";

const Sidebar = () => {
  const { data: session } = useSession();
  const userType = session?.user?.role;

  const links = [
    { href: "/home", label: "DASHBOARD" },
    userType === "SUPER_ADMIN" && { href: "/bias/", label: "BIA" },
    userType === "SUPER_ADMIN" && { href: "/deals/", label: "DEALS" },
    userType === "BIA" && { href: "/business/", label: "BUSINESS" },
    userType === "BUSINESS" && { href: "/employees/", label: "EMPLOYEES" },
  ].filter(Boolean);

  return (
    <div className="fixed  top-13 left-0 w-64 h-screen bg-white-600 shadow-lg	box-shadow: 0  15px ">
      <div className="flex flex-col items-center justify-between h-full p-4">
        <ul className="flex flex-col items-center space-y-2 w-full">
          {links.map((link, index) => (
            <li className="text-centerpx-2" key={index}>
              <Link href={link.href}>
                <div className="text-black cursor-pointer py-2 px-4 w-full">
                  {link.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
