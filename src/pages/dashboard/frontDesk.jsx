import moment from "moment";
import { BookingCalendar } from "../../components/bookingCalendar";
import DashboardLayout from "./dashboardLayout";
import { Button, Dropdown, TextInput } from "flowbite-react";
import useFetchCollection from "../../hooks/useFetchCollection";
import { useEffect, useState } from "react";
import CustomInput from "../../components/customInput";
import SearchInput from "../../components/searchInput";
import { FaBed, FaList } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";

const FrontDesk = () => {
  const { fetchCollection } = useFetchCollection();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("room");

  useEffect(() => {
    fetchCollection("rooms", setRooms, setLoading);
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto bg-[#F6F6F6] m-10 mb-20 p-10 rounded-2xl">
        <div className="flex justify-between items-center  p-5">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold">
              {filterType == "all"
                ? "Booking Calendar"
                : filterType == "room"
                ? "Rooms Booking Calendar"
                : "Event Booking Calendar"}
            </h1>
            <div className="flex mt-2">
              <Button.Group color="failure">
                <Button
                  color={filterType == "all" ? "failure" : "light"}
                  onClick={() => setFilterType("all")}
                >
                  <FaList className="mr-2 mt-1" /> All Bookings
                </Button>
                <Button
                  color={filterType == "room" ? "failure" : "light"}
                  onClick={() => setFilterType("room")}
                >
                  <FaBed className="mr-2 mt-1" /> Room
                </Button>
                <Button
                  color={filterType == "event" ? "failure" : "light"}
                  onClick={() => setFilterType("event")}
                >
                  <FaCalendarAlt className="mr-2 mt-1" /> Event
                </Button>
              </Button.Group>
            </div>
          </div>
          <SearchInput
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>

        <BookingCalendar
          rooms={rooms}
          searchQuery={searchQuery}
          filterType={filterType}
        />
      </div>
    </DashboardLayout>
  );
};

export default FrontDesk;
