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

export function PaymentsTable() {
  const { fetchCollection } = useFetchCollection();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("room");
  const { updateBookingPayment } = useCrudBooking();

  useEffect(() => {
    fetchCollection("bookings", setBookings, setLoading);
  }, []);

  const handlePaymentStatusChange = async (bookingId, newStatus) => {
    await updateBookingPayment(bookingId, newStatus);
    toast.success("Successfully updated the payment");
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter !== "all") {
      if (filter === "paid" && booking.paymentStatus !== "full") return false;
      if (filter === "unpaid" && booking.paymentStatus === "full") return false;
    }
    if (typeFilter !== "all" && booking.bookType !== typeFilter) return false;
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
    <div className="overflow-x-auto">
      <div className="flex gap-3 mb-5">
        <Button
          onClick={() => setTypeFilter("room")}
          color={typeFilter == "room" ? "failure" : "light"}
        >
          Room
        </Button>
        <Button
          onClick={() => setTypeFilter("event")}
          color={typeFilter == "event" ? "failure" : "light"}
        >
          Event
        </Button>
      </div>
      <div className="flex items-center justify-between mb-5">
        <TextInput
          onChange={(event) => setSearch(event.target.value)}
          className="w-60"
          placeholder="Search Here..."
          value={search}
        />

        <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </Select>
      </div>
      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>Guest Name</Table.HeadCell>
          {typeFilter == "room" && <Table.HeadCell>Room Number</Table.HeadCell>}

          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Payment Status</Table.HeadCell>
          <Table.HeadCell>Balance</Table.HeadCell>
          <Table.HeadCell>Check Out Date</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredBookings.map((booking, index) => {
            const date = booking.checkOutDate
              ? moment(booking.checkOutDate.toDate()).format("LLL")
              : "Invalid Date";

            return (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-bold text-lg text-red-500">
                  {booking.currentUser.name}
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
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell>
                  <Select
                    value={booking.paymentStatus}
                    onChange={(e) =>
                      handlePaymentStatusChange(booking.id, e.target.value)
                    }
                  >
                    <option value="down">Unpaid</option>
                    <option value="full">Paid</option>
                  </Select>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
