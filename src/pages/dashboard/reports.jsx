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
import ReportsTable from "../../components/reportsTable";

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
          <ReportsTable
            filteredBookings={filteredBookings}
            startDate={startDate}
            endDate={endDate}
          />
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
