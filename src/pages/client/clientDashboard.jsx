import { Button } from "flowbite-react";
import useUserStore from "../../utils/zustand";
import ClientDashboardLayout from "./_layout";
import useCrudBooking from "../../hooks/useCrudBooking";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import moment from "moment";

const ClientDashboard = () => {
  const { currentUser } = useUserStore();
  const { fetchUserBooking } = useCrudBooking();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooking = async () => {
      if (currentUser) {
        setLoading(true);
        await fetchUserBooking(currentUser, setBooking);
        setLoading(false);
      }
    };

    getBooking();
  }, [currentUser]);

  if (loading)
    return (
      <>
        <div className="container mx-auto h-screen flex items-center justify-center">
          <Loader />
        </div>
      </>
    );

  console.log(booking);

  return (
    <ClientDashboardLayout>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-start mb-5">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Good Day, {currentUser?.name}
          </h1>
          <p className="text-sm opacity-70">
            This is where you can view all the details about your booking
          </p>
        </div>
        <Button gradientMonochrome="failure">Request Accommodation</Button>
      </div>

      {booking ? (
        <div className="w-full bg-white rounded-lg px-5 dark:bg-gray-800">
          <div className="flex">
            <h1 className="my-3">
              {booking.checkInDate && booking.checkOutDate ? (
                <>
                  {moment(booking.checkInDate.toDate()).format("LL")}
                  {" - "}
                  {moment(booking.checkOutDate.toDate()).format("LL")}
                </>
              ) : (
                "Invalid booking dates"
              )}
            </h1>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-3xl text-center mt-20">
          No active bookings found.
        </p>
      )}
    </ClientDashboardLayout>
  );
};

export default ClientDashboard;
