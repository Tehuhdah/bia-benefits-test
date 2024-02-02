import { SessionProvider } from "next-auth/react";
import Header from "./Header";

const AdminLayout = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <Header />

      <main className="px-2 max-w-screen-xl mt-[64px] m-auto">{children}</main>
    </SessionProvider>
  );
};

export default AdminLayout;
