import moment from "moment";
import { BookingCalendar } from "../../components/bookingCalendar";
import DashboardLayout from "./dashboardLayout";
import { Button, Dropdown } from "flowbite-react";
import useFetchCollection from "../../hooks/useFetchCollection";
import { useEffect, useState } from "react";

const FrontDesk = () => {
  const { fetchCollection } = useFetchCollection();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchCollection("rooms", setRooms, setLoading);
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pb-20">
        <div className="flex justify-between items-center mb-10 p-5">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">Booking Calendar</h1>
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

        <BookingCalendar selectedRoom={selectedRoom} />
      </div>
    </DashboardLayout>
  );
};

export default FrontDesk;
