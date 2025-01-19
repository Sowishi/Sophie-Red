import moment from "moment";
import { BookingCalendar } from "../../components/bookingCalendar";
import DashboardLayout from "./dashboardLayout";
import { Button } from "flowbite-react";
import { HiOutlineArrowRight } from "react-icons/hi";

const FrontDesk = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto pb-20">
        <div className="flex justify-between items-center mb-10 p-5">
          <div className="div">
            <h1 className="text-2xl lg:text-4xl font-bold">Booking Calendar</h1>
            <p className="mt-3 text-sm text-gray-500">
              Sophie Red Hotel Booking Calendar
            </p>
          </div>
          <Button style={{ padding: 10 }} gradientMonochrome="failure"></Button>
        </div>
        <BookingCalendar />
      </div>
    </DashboardLayout>
  );
};

export default FrontDesk;
