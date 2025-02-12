import { Button } from "flowbite-react";
import Header from "../../components/header";
import { HiOutlineArrowRight } from "react-icons/hi";
import ChartComponent from "../../components/chartComponent";
import useUserStore from "../../utils/zustand";
import { ClientFooter } from "../../components/clientFooter";

const DashboardLayout = ({ children }) => {
  const { currentAdmin } = useUserStore();
  console.log(currentAdmin);
  return (
    <div className="w-full bg-slate-900 h-screen">
      <Header />
      <div
        className="w-full min-h-screen bg-white p-5 mb-20 "
        style={{
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          backgroundColor: "rgb(230,53,53)",
          backgroundImage:
            "linear-gradient(250deg, rgba(230,53,53,1) 0%, rgba(254,254,254,1) 60%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
