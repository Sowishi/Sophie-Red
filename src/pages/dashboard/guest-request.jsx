import { useState } from "react";
import DashboardLayout from "./dashboardLayout";
import { Button } from "flowbite-react";
import CustomModal from "../../components/customModal";
import CustomInput from "../../components/customInput";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import useCrudHousekeeping from "../../hooks/useCrudHousekeeping";
import HousekeeperListTable from "../../components/housekeeperListTable";

const GuestRequest = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px]">
        <div className="flex mb-10 flex-col lg:flex-row justify-between items-center">
          <div className="div p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">Guest Request</h1>
            <p className="mt-3 text-gray-500">Here's your guest request</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GuestRequest;
