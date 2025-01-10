import { Button } from "flowbite-react";
import Header from "../../components/header";
import { HiOutlineArrowRight } from "react-icons/hi";
import ChartComponent from "../../components/chartComponent";
import DashboardLayout from "./dashboardLayout";

const Index = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="div">
          <h1 className="text-5xl font-bold">Dashboard</h1>
          <p className="mt-3 text-gray-500">
            Sophie Red Hotel Dashboard{" "}
            <span style={{ color: "#6251CB" }} className="cursor-pointer">
              View Reports
            </span>
          </p>
        </div>
        <Button style={{ padding: 10 }} gradientMonochrome="failure">
          View Detailed Reports
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>{" "}
      </div>

      {/* Content */}

      <div className="flex  w-full mt-10">
        <div
          style={{ background: "#F6F6F6", marginRight: 10, borderRadius: 20 }}
          className="basis-6/12 p-10"
        >
          <div className="header flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="font-medium text-2xl">Overview</h1>
              <p className="text-gray-500">Monthly Booking Data</p>
            </div>
            <Button.Group>
              <Button color="gray">Daily</Button>
              <Button color="gray">Montly</Button>
              <Button color="gray">Yearly</Button>
            </Button.Group>
          </div>
          <ChartComponent />
        </div>
        <div
          style={{ background: "#F6F6F6", borderRadius: 20 }}
          className="basis-6/12 p-10"
        >
          <div className="header flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="font-medium text-2xl">User Overview</h1>
              <p className="text-gray-500">Monthly Booking Data</p>
            </div>
            <Button style={{ padding: 10 }} color="dark">
              User Management
              <HiOutlineArrowRight className="ml-2 h-5 w-5" />
            </Button>{" "}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
