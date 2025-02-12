"use client";

import {
  Badge,
  Button,
  Table,
  TextInput,
  Select,
  Dropdown,
  Tooltip,
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
import { BsThreeDots } from "react-icons/bs";

export function PaymentsTable({ typeFilter }) {
  const { fetchCollection } = useFetchCollection();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
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
    if (statusFilter !== "all" && booking.status !== statusFilter) return false;
    if (typeFilter !== "all" && booking.bookType !== typeFilter) return false;
    if (
      search &&
      !booking.currentUser?.name.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateA = a.checkInDate ? a.checkInDate.toDate() : new Date(0);
    const dateB = b.checkInDate ? b.checkInDate.toDate() : new Date(0);
    return dateA - dateB;
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

  const getStatusColor = (status) => {
    if (status === "Booked") return "info";
    if (status === "CheckIn") return "warning";
    return "success";
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="mx-2">
          <Dropdown label="Filter by status">
            <Dropdown.Item onClick={() => setStatusFilter("all")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setStatusFilter("Booked")}>
              Booked
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setStatusFilter("CheckIn")}>
              Check In
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setStatusFilter("Completed")}>
              Completed
            </Dropdown.Item>
          </Dropdown>
        </div>

        <TextInput
          icon={CiSearch}
          placeholder="Search by guest name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto shadow-2xl">
        <Table hoverable striped>
          <Table.Head className="bg-red-500">
            <Table.HeadCell className="bg-red-500 text-white">
              Guest Name
            </Table.HeadCell>
            {typeFilter == "room" && (
              <>
                <Table.HeadCell className="bg-red-500 text-white">
                  Room Type
                </Table.HeadCell>
                <Table.HeadCell className="bg-red-500 text-white">
                  Room Number
                </Table.HeadCell>
              </>
            )}
            <Table.HeadCell className="bg-red-500 text-white">
              Total Price
            </Table.HeadCell>
            <Table.HeadCell className="bg-red-500 text-white">
              Balance
            </Table.HeadCell>
            <Table.HeadCell className="bg-red-500 text-white">
              Check In Date
            </Table.HeadCell>
            <Table.HeadCell className="bg-red-500 text-white">
              Check Out Date
            </Table.HeadCell>
            <Table.HeadCell className="bg-red-500 text-white">
              Status
            </Table.HeadCell>
            <Table.HeadCell className="bg-red-500 text-white">
              Actions
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {sortedBookings.map((booking, index) => {
              const inDate = booking.checkInDate
                ? moment(booking.checkInDate.toDate()).format("LL")
                : "Invalid Date";
              const outDate = booking.checkOutDate
                ? moment(booking.checkOutDate.toDate()).format("LL")
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
                    <>
                      <Table.Cell>{booking.roomDetails.roomType}</Table.Cell>
                      <Table.Cell>{booking.roomDetails.roomNumber}</Table.Cell>
                    </>
                  )}
                  <Table.Cell>₱{booking.totalPrice}</Table.Cell>
                  <Table.Cell>
                    {booking.paymentStatus === "full" ? (
                      <h1>₱0</h1>
                    ) : (
                      <h1>₱{booking?.totalPrice - booking?.downpayment}</h1>
                    )}
                  </Table.Cell>
                  <Table.Cell>{inDate}</Table.Cell>
                  <Table.Cell>{outDate}</Table.Cell>
                  <Table.Cell>
                    <Badge color={getStatusColor(booking?.status)}>
                      {booking?.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      inline
                      arrowIcon={false}
                      label={<BsThreeDots className="cursor-pointer text-xl" />}
                    >
                      <Dropdown.Item
                        onClick={() =>
                          handlePaymentStatusChange(booking.id, "full")
                        }
                      >
                        Mark as Paid
                      </Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
