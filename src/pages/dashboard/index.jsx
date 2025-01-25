import { Button } from "flowbite-react";
import Header from "../../components/header";
import { HiOutlineArrowRight } from "react-icons/hi";
import ChartComponent from "../../components/chartComponent";
import DashboardLayout from "./dashboardLayout";
import LineGraph from "../../components/lineGraph";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigation = useNavigate();
  return (
    <DashboardLayout>
      <div className="container mx-auto mt-10 pt-10">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="div">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="mt-3 text-gray-500">
              Sophie Red Hotel Dashboard{" "}
              <span
                onClick={() => navigation("/reports")}
                style={{ color: "#6251CB" }}
                className="cursor-pointer"
              >
                View Reports
              </span>
            </p>
          </div>
          <Button
            onClick={() => navigation("/reports")}
            style={{ padding: 10 }}
            gradientMonochrome="failure"
          >
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
            <ChartComponent />
          </div>
          <div
            style={{ background: "#F6F6F6", borderRadius: 20 }}
            className="basis-6/12 p-10"
          >
            <div className="header flex items-center justify-between">
              <div className="flex flex-col">
                <h1 className="font-medium text-2xl">Sales Chart</h1>
                <p className="text-gray-500">
                  Overview of Daily and Monthly Sales
                </p>
              </div>
            </div>
            <LineGraph />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
