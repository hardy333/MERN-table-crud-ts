import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Index";
import TablePage from "../pages/table/Index";
import MainLayout from "../layouts/MainLayout";
import About from "@/pages/About";

const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/table/:tableName" element={<TablePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesComponent;
