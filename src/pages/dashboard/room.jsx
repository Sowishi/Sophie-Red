import { HiOutlineArrowRight } from "react-icons/hi";
import DashboardLayout from "./dashboardLayout";
import { Button, TextInput } from "flowbite-react";
import { RoomsTable } from "../../components/roomsTable";
import { useState } from "react";
import { CustomModal } from "../../components/customModal";
import CustomInput from "../../components/customInput";

const Room = () => {
  const [addRoomModal, setAddRoomModal] = useState(false);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="div">
          <h1 className="text-5xl font-bold">Room Management</h1>
          <p className="mt-3 text-gray-500">
            You can manage the room and monitor the rooms in this section
          </p>
        </div>
        <Button
          onClick={() => setAddRoomModal(true)}
          style={{ padding: 10 }}
          gradientMonochrome="failure"
        >
          Add A room
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>{" "}
      </div>

      <div className="cotainer mt-10 bg-[#F6F6F6] p-10 rounded-lg min-h-[600px]">
        <RoomsTable />
      </div>

      {/* Modals */}
      <CustomModal
        title={"Add a room"}
        size={"5xl"}
        open={addRoomModal}
        handleClose={() => setAddRoomModal(false)}
      >
        <CustomInput label={"Room Number"} value="test" onChange={() => {}} />
      </CustomModal>
    </DashboardLayout>
  );
};

export default Room;
