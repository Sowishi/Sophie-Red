import { HiOutlineArrowRight } from "react-icons/hi";
import DashboardLayout from "./dashboardLayout";
import { Button, TextInput } from "flowbite-react";
import { RoomsTable } from "../../components/roomsTable";
import { useEffect, useState } from "react";
import CustomModal from "../../components/customModal";
import CustomInput from "../../components/customInput";
import { CustomSelect } from "../../components/customSelect";
import { roomTypeData } from "../../utils/roomType";
import { CustomTextArea } from "../../components/customTextarea";
import useCrudRooms from "../../hooks/useCrudRooms";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import loader from "../../assets/lotties/loader.json";
import { HousekeepingTable } from "../../components/housekeepingTable";
import HousekeeperTable from "../../components/housekeeperTable";

const Housekeeper = () => {
  return (
    <DashboardLayout>
      {/* Header */}

      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px]">
        <div className="flex mb-10 flex-col lg:flex-row justify-between items-center">
          <div className="div p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">
              Housekeeping tasks
            </h1>
            <p className="mt-3 text-gray-500">
              Below is the list of the task, pending request and supervisor
              request
            </p>
          </div>
        </div>

        <HousekeeperTable />
      </div>
    </DashboardLayout>
  );
};

export default Housekeeper;
