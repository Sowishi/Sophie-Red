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
import { VoucherTable } from "../../components/voucherTable";

const Voucher = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px]">
        <div className="flex mb-10 flex-col lg:flex-row justify-between items-center">
          <div className="div p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">Voucher</h1>
            <p className="mt-3 text-gray-500">
              You can create and manage voucher here
            </p>
          </div>
          <Button
            onClick={() => setOpenModal(true)}
            style={{ padding: 10 }}
            gradientMonochrome="failure"
          >
            Add Voucher
            <FaPlus className="ml-2 h-5 w-5" />
          </Button>{" "}
        </div>

        <VoucherTable
          handleCloseModal={() => setOpenModal(false)}
          openModal={openModal}
        />
      </div>
    </DashboardLayout>
  );
};

export default Voucher;
