import { Alert, Button } from "flowbite-react";
import DashboardLayout from "./dashboardLayout";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { PaymentsTable } from "../../components/paymentsTable";
import { CiWarning } from "react-icons/ci";
import { FaBed, FaList } from "react-icons/fa6";
import { useState } from "react";
import SearchInput from "../../components/searchInput";

const Payments = () => {
  const [filterType, setFilterType] = useState("room");
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px] pt-10 ">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="div p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">Booking Payments</h1>
            <div className="flex mt-2">
              <Button.Group color="failure">
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
          <SearchInput onChange={(event) => setSearch(event.target.value)} />
        </div>{" "}
        <PaymentsTable search={search} typeFilter={filterType} />
      </div>
    </DashboardLayout>
  );
};

export default Payments;
