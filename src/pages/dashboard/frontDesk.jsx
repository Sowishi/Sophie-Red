import moment from "moment";
import { BookingCalendar } from "../../components/bookingCalendar";
import DashboardLayout from "./dashboardLayout";
import { Button, Dropdown } from "flowbite-react";
import useFetchCollection from "../../hooks/useFetchCollection";
import { useEffect, useState } from "react";
import CustomInput from "../../components/customInput";

const FrontDesk = () => {
  const { fetchCollection } = useFetchCollection();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("room");

  useEffect(() => {
    fetchCollection("rooms", setRooms, setLoading);
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-10 pb-20">
        <div className="flex justify-between items-center  p-5">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">
              {filterType == "room"
                ? "Rooms Booking Calendar"
                : "Event Booking Calendar"}
            </h1>
            <p className="mt-3 text-sm text-gray-500">
              Sophie Red Hotel Booking Calendar
            </p>
          </div>

          {/* ✅ Fixed Dropdown */}
          <Dropdown
            color="failure"
            label={selectedRoom ? `Room ${selectedRoom}` : "Check Room"}
          >
            <Dropdown.Item onClick={() => setSelectedRoom(null)}>
              All Rooms
            </Dropdown.Item>
            {rooms.map((item) => (
              <Dropdown.Item
                key={item.id}
                onClick={() => setSelectedRoom(item.roomNumber)}
              >
                Room {item.roomNumber}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex">
            <Button
              color={filterType === "room" ? "failure" : "light"}
              className="px-5 mr-5"
              onClick={() => setFilterType("room")}
            >
              Rooms
            </Button>
            <Button
              color={filterType === "event" ? "failure" : "light"}
              onClick={() => setFilterType("event")}
            >
              Events
            </Button>
          </div>
          <CustomInput
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={"Search for a guest"}
          />
        </div>

        <BookingCalendar
          searchQuery={searchQuery}
          selectedRoom={selectedRoom}
          filterType={filterType}
        />
      </div>
    </DashboardLayout>
  );
};

export default FrontDesk;
