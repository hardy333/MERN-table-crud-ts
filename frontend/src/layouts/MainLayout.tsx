import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex  p">
        <Sidebar />
        <main className="w-full m-4 min-h-[200vh] p-4 rounded-2xl bg-bg1/40 ">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
