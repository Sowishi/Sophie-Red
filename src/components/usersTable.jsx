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

export function UsersTable() {
  const { fetchCollection } = useFetchCollection();
  const { updateUser, deleteUser } = useCrudUsers(); // Assuming `deleteUser` exists in the custom hook
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch users on component mount
    fetchCollection(
      "users",
      (data) => {
        setUsers(data);
        setFilteredUsers(data);
      },
      setLoading
    );
  }, []);

  useEffect(() => {
    // Filter users based on search input
    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async () => {
    try {
      await updateUser(selectedUser.id, selectedUser);
      console.log("Updated User:", selectedUser);
      toast.success("User updated successfully!");
      setSelectedUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user!");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      console.log("Deleted User ID:", userId);
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user!");
    }
  };

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

  if (users.length === 0) {
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
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredUsers.map((user, index) => {
            const date = user.createdAt
              ? moment(user.createdAt.toDate()).format("LLL")
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
                      src={user?.photoURL}
                      alt=""
                    />{" "}
                    {user.fullName}
                  </div>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{date}</Table.Cell>
                <Table.Cell className="flex items-center justify-center">
                  <Button onClick={() => setSelectedUser(user)} color="info">
                    Edit
                  </Button>
                  <Button
                    className="ml-3"
                    onClick={() => handleDeleteUser(user.id)}
                    color="failure"
                  >
                    Delete <FaTrash className="ml-2 h-5 w-5" />
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
