import { Alert, Badge, Button, Table } from "flowbite-react";
import DashboardLayout from "./dashboardLayout";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import useCrudBooking from "../../hooks/useCrudBooking";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: "1px solid #ddd",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
});

const ReportsPDF = ({ bookings }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Bookings Report</Text>
      {bookings.map((booking, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.text}>
            Guest Name: {booking.currentUser.name}
          </Text>
          <Text style={styles.text}>
            Room Number: {booking.roomDetails.roomNumber}
          </Text>
          <Text style={styles.text}>Total Price: ₱{booking.totalPrice}</Text>
          <Text style={styles.text}>
            Payment Status:{" "}
            {booking.paymentStatus === "full" ? "Fully Paid" : "Unpaid"}
          </Text>
          <Text style={styles.text}>
            Balance: ₱
            {booking.paymentStatus === "full"
              ? "0"
              : booking.totalPrice - booking.downpayment}
          </Text>
          <Text style={styles.text}>
            Check-In Date:{" "}
            {booking.checkInDate
              ? moment(booking.checkInDate.toDate()).format("LLL")
              : "Invalid Date"}
          </Text>
          <Text style={styles.text}>
            Check-Out Date:{" "}
            {booking.checkOutDate
              ? moment(booking.checkOutDate.toDate()).format("LLL")
              : "Invalid Date"}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

const Reports = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const { fetchAllBookings } = useCrudBooking();

  useEffect(() => {
    fetchAllBookings(setBookings);
  }, []);

  useEffect(() => {
    if (filter === "all") {
      setFilteredBookings(bookings);
    } else if (filter === "daily") {
      const today = moment().startOf("day");
      setFilteredBookings(
        bookings.filter((booking) =>
          moment(booking.createdAt.toDate()).isSame(today, "day")
        )
      );
    } else if (filter === "monthly") {
      const currentMonth = moment().month();
      setFilteredBookings(
        bookings.filter(
          (booking) =>
            moment(booking.createdAt.toDate()).month() === currentMonth
        )
      );
    }
  }, [filter, bookings]);

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
            <div className="flex space-x-4">
              <Button
                className={`${
                  filter === "all"
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-500"
                } border border-red-500`}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button
                className={`${
                  filter === "daily"
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-500"
                } border border-red-500`}
                onClick={() => setFilter("daily")}
              >
                Daily
              </Button>
              <Button
                className={`${
                  filter === "monthly"
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-500"
                } border border-red-500`}
                onClick={() => setFilter("monthly")}
              >
                Monthly
              </Button>
            </div>

            <PDFDownloadLink
              document={<ReportsPDF bookings={filteredBookings} />}
              fileName="bookings_report.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <Button disabled>Generating PDF...</Button>
                ) : (
                  <Button color="purple" icon={FaPlus}>
                    Export to PDF
                  </Button>
                )
              }
            </PDFDownloadLink>
          </div>
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
            {filteredBookings.map((booking, index) => {
              const date = booking.checkOutDate
                ? moment(booking.checkOutDate.toDate()).format("LLL")
                : "Invalid Date";
              const checkIn = booking.checkInDate
                ? moment(booking.checkInDate.toDate()).format("LLL")
                : "Invalid Date";

              return (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="font-bold text-lg text-red-500">
                    {booking.currentUser.name}
                  </Table.Cell>
                  <Table.Cell>{booking.roomDetails.roomNumber}</Table.Cell>
                  <Table.Cell>₱{booking.totalPrice}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={
                        booking.paymentStatus === "full" ? "success" : "failure"
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
    </DashboardLayout>
  );
};

export default Reports;
