"use client";

import {
  Badge,
  Button,
  Checkbox,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import { useEffect, useState } from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import { CiSearch } from "react-icons/ci";
import empty from "../assets/empty-box.png";
import Lottie from "react-lottie";
import loader from "../assets/lotties/loader.json";
import { FaTrash } from "react-icons/fa6";
import CustomModal from "./customModal";
import CustomInput from "./customInput";
import { CustomSelect } from "./customSelect"; // Ensure this component is implemented
import { toast } from "react-toastify";
import useCrudUsers from "../hooks/useCrudUsers";
import moment from "moment/moment";

export function PaymentsTable() {
  const { fetchCollection } = useFetchCollection();
  const { updateUser, deleteUser } = useCrudUsers(); // Assuming `deleteUser` exists in the custom hook
  const [bookings, setBookings] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch users on component mount
    fetchCollection("bookings", setBookings, setLoading);
  }, []);

  if (loading) {
    return (
      <div className="container flex pt-28 h-full justify-center items-center flex-col">
        <Lottie
          style={{ width: 150 }}
          options={{
            animationData: loader,
            autoplay: true,
          }}
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
      <div className="flex items-center justify-end mb-5">
        <TextInput
          onChange={(event) => setSearch(event.target.value)}
          className="w-60"
          placeholder="Search Here..."
          value={search}
        />
        <CiSearch className="ml-3" size={24} />
      </div>
      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>Guest Name</Table.HeadCell>
          <Table.HeadCell>Room Number</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Payment Status</Table.HeadCell>
          <Table.HeadCell>Balance</Table.HeadCell>
          <Table.HeadCell>Check Out Date</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {bookings.map((booking, index) => {
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
                <Table.Cell>{booking.roomDetails.roomNumber}</Table.Cell>
                <Table.Cell>₱{booking.totalPrice}</Table.Cell>
                <Table.Cell>
                  {booking.paymentStatus == "down" ? (
                    "Unpaid"
                  ) : (
                    <Badge color="success">Fully Paid</Badge>
                  )}
                </Table.Cell>
                <Table.Cell>
                  {booking.paymentStatus == "full" ? (
                    <Badge color="success">No Balance</Badge>
                  ) : (
                    <h1>₱{booking?.totalPrice - booking?.downpayment}</h1>
                  )}
                </Table.Cell>
                <Table.Cell>{date}</Table.Cell>

                <Table.Cell className="flex items-center justify-center">
                  <Button
                    gradientMonochrome="failure"
                    className="ml-3"
                    onClick={() => handleDeleteUser(user.id)}
                    color="failure"
                  >
                    Update Payment
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      {selectedUser && (
        <CustomModal
          title="Edit User"
          size="5xl"
          open={!!selectedUser}
          handleClose={() => setSelectedUser(null)}
          onSubmit={handleSaveUser}
        >
          <div className="container">
            <CustomInput
              label="Full Name"
              value={selectedUser.fullName || ""}
              onChange={handleChange}
              name="fullName"
              placeholder="Enter full name"
            />
            <CustomInput
              label="Email"
              value={selectedUser.email || ""}
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter email"
            />
            <CustomInput
              label="Password"
              value={selectedUser.password || ""}
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter password"
            />
            <CustomSelect
              value={selectedUser.role || "Select Role"}
              data={[
                "Select Role",
                "Admin",
                "Front Desk",
                "Super Admin",
                "Housekeeping",
              ]}
              label="Role"
              name="role"
              onChange={handleChange}
            />
          </div>
        </CustomModal>
      )}
    </div>
  );
}
