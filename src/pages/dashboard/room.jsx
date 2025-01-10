import { HiOutlineArrowRight } from "react-icons/hi";
import DashboardLayout from "./dashboardLayout";
import { Button } from "flowbite-react";
import { RoomsTable } from "../../components/roomsTable";

const Room = () => {
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
        <Button style={{ padding: 10 }} gradientMonochrome="failure">
          Add A room
          <HiOutlineArrowRight className="ml-2 h-5 w-5" />
        </Button>{" "}
      </div>

      <div className="cotainer mt-10 bg-[#F6F6F6] p-10 rounded-lg min-h-[600px]">
        <RoomsTable />
      </div>
    </DashboardLayout>
  );
};

export default Room;
