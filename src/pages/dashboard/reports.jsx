import { Alert, Badge, Button, Table, Modal } from "flowbite-react";
import DashboardLayout from "./dashboardLayout";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import moment from "moment";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import useCrudBooking from "../../hooks/useCrudBooking";
import logo from "../../assets/logo.png";
import { usePDF } from "react-to-pdf";
import PDFPreview from "../../components/PDFPreview";

const Reports = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [startDate, setStartDate] = useState(null); // Default to today's start
  const [endDate, setEndDate] = useState(null); // Default to today's end
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const { fetchAllBookings } = useCrudBooking();
  const { toPDF, targetRef } = usePDF({ filename: "bookings_report.pdf" });

  useEffect(() => {
    fetchAllBookings(setBookings);
  }, []);

  useEffect(() => {
    // Filter bookings based on the selected date range
    if (startDate !== null && endDate !== null) {
      const filtered = bookings.filter((booking) => {
        const bookingDate = moment(booking.createdAt.toDate());
        return bookingDate.isBetween(startDate, endDate, null, "[]"); // Inclusive of start and end dates
      });
      setFilteredBookings(filtered);
      return;
    }
    setFilteredBookings(bookings);
  }, [startDate, endDate, bookings]);

  return (
    <DashboardLayout>
      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px] pt-10">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">Reports</h1>
            <p className="mt-3 text-gray-500">
              You can manage and generate reports in this section
            </p>
          </div>
          <div className="flex space-x-4">
            <Button
              gradientMonochrome="failure"
              icon={FaPlus}
              onClick={() => setIsModalOpen(true)}
            >
              Preview & Export
            </Button>
          </div>
        </div>

        {/* Date Range Inputs */}
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              value={moment(startDate).format("YYYY-MM-DD")}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              className="mt-1 p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              value={moment(endDate).format("YYYY-MM-DD")}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              className="mt-1 p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Table with Title */}
        <div ref={targetRef} className="bg-white p-6 rounded-lg shadow-2xl">
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
              Booking Report {""}{" "}
              <span className="ml-3 text-red-500 opacity-85">
                {moment(startDate.toDateString()).format("LL")} -{" "}
                {moment(endDate.toDateString()).format("LL")}
              </span>
            </h2>
          )}
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
              {filteredBookings.map((booking, index) => {
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
                        {" "}
                        <img
                          width={35}
                          className="rounded-full mr-2"
                          src={booking.currentUser?.photoURL}
                          alt=""
                        />{" "}
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
                          booking.paymentStatus === "full"
                            ? "success"
                            : "failure"
                        }
                      >
                        {booking.paymentStatus === "full"
                          ? "Fully Paid"
                          : "Unpaid"}
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
        </div>
      </div>

      <PDFPreview
        toPDF={toPDF}
        startDate={startDate}
        endDate={endDate}
        filteredBookings={filteredBookings}
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </DashboardLayout>
  );
};

export default Reports;
