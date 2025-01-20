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
import { FaArrowRight, FaTrash } from "react-icons/fa6";
import { BottomDrawer } from "./bottomDrawer";
import CustomGallery from "./gallery";
import { AiOutlineCloudUpload } from "react-icons/ai";
import CustomModal from "./customModal";
import CustomInput from "./customInput";
import { handleFileUpload } from "../utils/uploadPhoto";
import { toast } from "react-toastify";
import useCrudRooms from "../hooks/useCrudRooms";
import moment from "moment/moment";
export function UsersTable() {
  const { fetchCollection } = useFetchCollection();
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCollection("users", setUsers, setLoading);
  }, []);

  if (loading) {
    return (
      <div className="container flex pt-28 h-full justify-center items-center flex-col">
        {/* <img className="w-[200px]" src={empty} /> */}
        <h1 className="text-3xl mt-5 opacity-50">
          <Lottie
            style={{ width: 150 }}
            options={{
              animationData: loader,
              autoplay: true,
            }}
          />
        </h1>
      </div>
    );
  }
  if (users == null) {
    return (
      <div className="container flex pt-28 h-full justify-center items-center flex-col">
        <img className="w-[200px]" src={empty} />
        <h1 className="text-3xl mt-5 opacity-50">There's no rooms yet</h1>
      </div>
    );
  }

  if (users.length <= 0) {
    return (
      <div className="container flex pt-28 h-full justify-center items-center flex-col">
        <img className="w-[200px]" src={empty} />
        <h1 className="text-3xl mt-5 opacity-50">There's no rooms yet</h1>
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
        />
        <CiSearch className="ml-3" size={24} />
      </div>
      <Table hoverable striped>
        <Table.Head>
          <Table.HeadCell>Full Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Password</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>

          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user, index) => {
            const date = user.createdAt
              ? moment(user.createdAt.toDate()).format("LLL")
              : "invalid";

            return (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="font-bold text-lg text-red-500">
                  {user.fullName}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.password}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{date}</Table.Cell>

                <Table.Cell className="flex items-center justify-center">
                  <Button onClick={() => setSelectedRoom(room)} color="info">
                    View Room <FaArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    className="ml-3"
                    onClick={() => deleteRoom(room.id)}
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
    </div>
  );
}
