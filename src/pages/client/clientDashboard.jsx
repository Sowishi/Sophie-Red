import { Alert, Button } from "flowbite-react";
import useUserStore from "../../utils/zustand";
import ClientDashboardLayout from "./clientDashboardLayout";
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
      </div>

      {booking ? (
        <div className="w-full">
          <div className="flex flex-wrap">
            <div className="basis-full lg:basis-8/12">
              {booking.paymentStatus == "down" && (
                <div className="flex items-center space-x-3">
                  <Alert color="warning">
                    <h1>
                      Thank you for booking with us! You can always pay the full
                      price here.
                    </h1>
                  </Alert>
                  <Button gradientMonochrome="failure" className="px-5">
                    Pay Now
                  </Button>
                </div>
              )}

              <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
                <h1 className="text-2xl font-semibold">Book Information</h1>
                <Alert color="success" className="my-3">
                  You successfully booked a room! Here’s your booking
                  information.
                </Alert>
                <hr />
                <div className="flex flex-wrap mx-10 mt-5">
                  <div className="basis-full my-2 lg:basis-4/12">
                    <div className="flex flex-col">
                      <h1>Full Name</h1>
                      <h1 className="text-lg font-bold">{currentUser?.name}</h1>
                    </div>
                  </div>
                  <div className="basis-full my-2 lg:basis-4/12">
                    <div className="flex flex-col">
                      <h1>Email</h1>
                      <h1 className="text-lg font-bold">
                        {currentUser?.email}
                      </h1>
                    </div>
                  </div>
                  <div className="basis-full my-2 lg:basis-4/12">
                    <div className="flex flex-col">
                      <h1>Guest ID</h1>
                      <h1 className="text-lg font-bold">{currentUser?.uid}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basis-full lg:basis-4/12">
              <div className="rounded-lg bg-white mt-5 lg:mt-0 mx-0 lg:mx-5 p-5">
                <h1 className="text-2xl font-semibold">Summary</h1>
              </div>
            </div>
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
