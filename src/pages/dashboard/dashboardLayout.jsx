import { Button } from "flowbite-react";
import Header from "../../components/header";
import { HiOutlineArrowRight } from "react-icons/hi";
import ChartComponent from "../../components/chartComponent";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full bg-slate-900 h-screen">
      <Header />
      <div
        className="w-full h-full bg-white p-20"
        style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
