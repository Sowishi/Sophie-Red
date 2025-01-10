import { HiOutlineArrowRight } from "react-icons/hi";
import DashboardLayout from "./dashboardLayout";
import { Button, TextInput } from "flowbite-react";
import { RoomsTable } from "../../components/roomsTable";
import { useEffect, useState } from "react";
import { CustomModal } from "../../components/customModal";
import CustomInput from "../../components/customInput";
import { CustomSelect } from "../../components/customSelect";
import { roomTypeData } from "../../utils/roomType";
import { CustomTextArea } from "../../components/customTextarea";
import useCrudRooms from "../../hooks/useCrudRooms";
import useFetchCollection from "../../hooks/useFetchCollection";

const Room = () => {
  const [addRoomModal, setAddRoomModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { addRoom } = useCrudRooms();
  const { fetchCollection } = useFetchCollection();

  const [forms, setForms] = useState({
    roomNumber: "",
    pricePerNight: "",
    roomType: "",
    description: "",
    adultCount: "",
    childCount: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    // Validation: Only allow numbers for specific fields
    if (
      name === "roomNumber" ||
      name === "pricePerNight" ||
      name === "adultCount" ||
      name === "childCount"
    ) {
      if (!/^\d*$/.test(value)) {
        return; // Disallow non-numeric input
      }
    }

    setForms({ ...forms, [name]: value });
  };

  const handleSubmit = async () => {
    await addRoom(forms);
  };

  useEffect(() => {
    fetchCollection("rooms", setRooms);
  }, []);

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
        onSubmit={handleSubmit}
      >
        <div className="container">
          <div className="flex">
            <div className="basis-6/12">
              <CustomInput
                label={"Room Number"}
                value={forms.roomNumber}
                onChange={handleChange}
                name={"roomNumber"}
                placeholder={"Please enter the room number"}
              />
            </div>
            <div className="basis-6/12">
              <CustomInput
                label={"Price Per Night (₱)"}
                value={forms.pricePerNight}
                onChange={handleChange}
                name={"pricePerNight"}
                placeholder={"Please enter the price per night"}
              />
            </div>
          </div>
          <div className="flex">
            <div className="basis-6/12">
              <CustomInput
                label={"Adult Count Allowed"}
                value={forms.adultCount}
                onChange={handleChange}
                name={"adultCount"}
                placeholder={"Please enter number of adult allowed"}
              />
            </div>
            <div className="basis-6/12">
              <CustomInput
                label={"Child Count Allowed"}
                value={forms.childCount}
                onChange={handleChange}
                name={"childCount"}
                placeholder={"Please enter number of child allowed"}
              />
            </div>
          </div>
          <div className="flex">
            <div className="basis-6/12">
              <CustomSelect
                value={forms.roomType}
                data={["Please select the room type", ...roomTypeData]}
                label={"Room Type"}
                name={"roomType"}
                onChange={handleChange}
              />
            </div>
            <div className="basis-6/12">
              <CustomTextArea
                onChange={handleChange}
                label={"Description"}
                name={"description"}
                value={forms.description}
                placeholder={"Please enter the description"}
              />
            </div>
          </div>
        </div>
      </CustomModal>
    </DashboardLayout>
  );
};

export default Room;
