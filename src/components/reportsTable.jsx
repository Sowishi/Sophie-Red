import { Badge, Table, TextInput } from "flowbite-react";
import moment from "moment";
import { useState } from "react";
import logo from "../assets/logo.png";

const ReportsTable = ({ filteredBookings, startDate, endDate, preparedBy }) => {
  const [search, setSearch] = useState("");

  const filterData = filteredBookings.filter((item) => {
    if (
      item.currentUser.name.toLowerCase().includes(search.toLowerCase()) ||
      item.roomDetails?.roomNumber?.includes(search)
    ) {
      return item;
    }
  });

  return (
    <>
      <div className="text-center border-b pb-4 mb-4">
        <div className="flex justify-center items-center">
          <img className="w-[200px]" src={logo} alt="Logo" />
        </div>
        <h2 className="text-xl font-bold">
          SOPHIERED HOTEL AND ONSHORE RESTAURANT
        </h2>
        <p className="text-sm">
          Purok 9 Robontugan, 9003, Jasaan, Misamis Oriental, Philippines
        </p>
        <p className="text-sm">GRACE A. JARDIN - Prop.</p>
        <p className="text-sm">VAT REG. TIN: 254-650-511-0000</p>
      </div>
      {startDate && endDate && (
        <h2 className="text-xl font-bold mb-4">
          Booking Report{" "}
          <span className="ml-3 text-red-500 opacity-85">
            {moment(startDate.toDateString()).format("LL")} -{" "}
            {moment(endDate.toDateString()).format("LL")}
          </span>
        </h2>
      )}

      <div className="mb-4 flex justify-between items-center">
        <TextInput
          placeholder="Search by Name, Date, Room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />
      </div>

      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>Guest Name</Table.HeadCell>
          <Table.HeadCell>Room Number</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Payment Status</Table.HeadCell>
          <Table.HeadCell>Balance</Table.HeadCell>
          <Table.HeadCell>Check-In Date</Table.HeadCell>
          <Table.HeadCell>Check-Out Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filterData.map((booking, index) => {
            const date = booking.checkOutDate
              ? moment(booking.checkOutDate.toDate()).format("LL")
              : "Invalid Date";
            const checkIn = booking.checkInDate
              ? moment(booking.checkInDate.toDate()).format("LL")
              : "Invalid Date";

            return (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-bold text-lg text-red-500">
                  <div className="flex items-center justify-start">
                    <img
                      width={35}
                      className="rounded-full mr-2"
                      src={booking.currentUser?.photoURL}
                      alt=""
                    />
                    {booking.currentUser.name}
                  </div>
                </Table.Cell>
                <Table.Cell>
                  {booking.roomDetails.roomNumber || "Functional Room"}
                </Table.Cell>
                <Table.Cell>₱{booking.totalPrice}</Table.Cell>
                <Table.Cell>
                  <Badge
                    color={
                      booking.paymentStatus === "full" ? "success" : "failure"
                    }
                  >
                    {booking.paymentStatus === "full" ? "Fully Paid" : "Unpaid"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {booking.paymentStatus === "full" ? (
                    <Badge color="success">No Balance</Badge>
                  ) : (
                    <h1>₱{booking.totalPrice - booking.downpayment}</h1>
                  )}
                </Table.Cell>
                <Table.Cell>{checkIn}</Table.Cell>
                <Table.Cell>{date}</Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <div className="mt-6 text-right">
        <p className="text-sm font-semibold">
          Prepared by: {preparedBy || "___________"}
        </p>
      </div>
    </>
  );
};

export default ReportsTable;
