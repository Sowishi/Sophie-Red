"use client";

import {
  Badge,
  Button,
  Table,
  TextInput,
  Select,
  Dropdown,
} from "flowbite-react";
import { useEffect, useState } from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import { CiSearch } from "react-icons/ci";
import empty from "../assets/empty-box.png";
import Lottie from "react-lottie";
import loader from "../assets/lotties/loader.json";
import moment from "moment/moment";
import useCrudBooking from "../hooks/useCrudBooking";
import { toast } from "react-toastify";

export function BookingHistoryTable({ typeFilter }) {
  const { fetchCollection } = useFetchCollection();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all"); // New status filter
  const { updateBookingPayment } = useCrudBooking();

  useEffect(() => {
    fetchCollection("bookings", setBookings, setLoading);
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    if (filter !== "all") {
      if (filter === "paid" && booking.paymentStatus !== "full") return false;
      if (filter === "unpaid" && booking.paymentStatus === "full") return false;
    }
    if (typeFilter !== "all" && booking.bookType !== typeFilter) return false;
    if (statusFilter !== "all" && booking.status !== statusFilter) return false; // New filter condition
    return true;
  });

  if (loading) {
    return (
      <div className="container flex pt-28 h-full justify-center items-center flex-col">
        <Lottie
          style={{ width: 150 }}
          options={{ animationData: loader, autoplay: true }}
        />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="container flex pt-28 h-full justify-center items-center flex-col">
        <img className="w-[200px]" src={empty} alt="No users" />
        <h1 className="text-3xl mt-5 opacity-50">There's no users yet</h1>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto shadow-2xl">
      {/* Status Filter Dropdown */}
      <div className="mb-4 flex justify-end">
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-48"
        >
          <option value="all">All</option>
          <option value="Booked">Booked</option>
          <option value="Completed">Completed</option>
        </Select>
      </div>

      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>Guest Name</Table.HeadCell>
          {typeFilter == "room" && <Table.HeadCell>Room Number</Table.HeadCell>}
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Payment Status</Table.HeadCell>
          <Table.HeadCell>Balance</Table.HeadCell>
          <Table.HeadCell>Check In Date</Table.HeadCell>
          <Table.HeadCell>Check Out Date</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredBookings.map((booking, index) => {
            const date = booking.checkOutDate
              ? moment(booking.checkOutDate.toDate()).format("LLL")
              : "Invalid Date";
            const date2 = booking.checkInDate
              ? moment(booking.checkInDate.toDate()).format("LLL")
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

                {booking?.bookType == "room" && (
                  <Table.Cell>{booking.roomDetails.roomNumber}</Table.Cell>
                )}
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
                    <h1>₱{booking?.totalPrice - booking?.downpayment}</h1>
                  )}
                </Table.Cell>
                <Table.Cell>{date2}</Table.Cell>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>
                  <Badge>{booking.status}</Badge>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
