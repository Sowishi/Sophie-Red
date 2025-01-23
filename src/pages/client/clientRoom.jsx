import { Button, Table } from "flowbite-react";
import DisplayRoom from "../../components/displayRoom";
import useUserStore from "../../utils/zustand";
import ClientDashboardLayout from "./clientDashboardLayout";

const ClientRoom = () => {
  const { booking } = useUserStore();
  const roomDetails = booking?.roomDetails || {}; // Use optional chaining to prevent errors

  return (
    <ClientDashboardLayout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-extrabold text-lg lg:text-3xl">
          Your Room Information
        </h1>
        <Button gradientMonochrome="failure">Request Service</Button>
      </div>

      {roomDetails && (
        <div className="container mx-auto h-screen flex flex-wrap">
          {/* Left Side - Room Display */}
          <div className="basis-full lg:basis-6/12 flex">
            <DisplayRoom roomID={roomDetails.id} />
          </div>

          {/* Right Side - Room Details Table */}
          <div className="basis-full lg:basis-6/12 mt-5 lg:mt-0">
            <Table className="border border-gray-300 shadow-sm lg:mx-5">
              <Table.Head>
                <Table.HeadCell className="bg-gray-200 text-gray-700">
                  Property
                </Table.HeadCell>
                <Table.HeadCell className="bg-gray-200 text-gray-700">
                  Details
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                <Table.Row className="bg-white">
                  <Table.Cell className="font-medium">Room Type</Table.Cell>
                  <Table.Cell>{roomDetails.roomType}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-gray-50">
                  <Table.Cell className="font-medium">Room Number</Table.Cell>
                  <Table.Cell>{roomDetails.roomNumber}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="font-medium">Adults</Table.Cell>
                  <Table.Cell>{roomDetails.adultCount}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-gray-50">
                  <Table.Cell className="font-medium">Children</Table.Cell>
                  <Table.Cell>{roomDetails.childCount}</Table.Cell>
                </Table.Row>
                <Table.Row className="bg-white">
                  <Table.Cell className="font-medium">
                    Price per Night
                  </Table.Cell>
                  <Table.Cell>₱{roomDetails.pricePerNight}</Table.Cell>
                </Table.Row>

                <Table.Row className="bg-white">
                  <Table.Cell className="font-medium">Description</Table.Cell>
                  <Table.Cell>{roomDetails.description}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </ClientDashboardLayout>
  );
};

export default ClientRoom;
