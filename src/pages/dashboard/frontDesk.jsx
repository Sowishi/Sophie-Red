import moment from "moment";
import { BookingCalendar } from "../../components/bookingCalendar";
import DashboardLayout from "./dashboardLayout";
import { Button, Dropdown } from "flowbite-react";
import FrontDeskHeader from "../../components/frontDeskHeader";

const FrontDesk = () => {
  return (
    <DashboardLayout>
      <div className="w-full mx-auto pb-20">
        <div className="flex justify-between items-center mb-10 p-5 ">
          <div className="div">
            <h1 className="text-2xl lg:text-4xl font-bold">Booking Calendar</h1>
            <p className="mt-3 text-sm text-gray-500">
              Sophie Red Hotel Booking Calendar
            </p>
          </div>
          <Button
            onClick={() => setBookModal(true)}
            style={{ padding: 10 }}
            gradientMonochrome="failure"
          >
            Check Rooms
          </Button>
        </div>
        <FrontDeskHeader />

        <BookingCalendar />
      </div>
    </DashboardLayout>
  );
};

export default FrontDesk;
