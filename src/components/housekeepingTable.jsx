"use client";

import {
  Badge,
  Button,
  Table,
  TextInput,
  Label,
  Select,
  Textarea,
  Modal,
  Dropdown,
  Tooltip,
} from "flowbite-react";
import { useEffect, useState } from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import { CiSearch } from "react-icons/ci";
import empty from "../assets/empty-box.png";
import Lottie from "react-lottie";
import loader from "../assets/lotties/loader.json";
import { FaArrowRight } from "react-icons/fa6";
import { BottomDrawer } from "./bottomDrawer";
import { toast } from "react-toastify";
import useCrudHousekeeping from "../hooks/useCrudHousekeeping";
import moment from "moment/moment";
import useUserStore from "../utils/zustand";

export function HousekeepingTable() {
  const { fetchCollection } = useFetchCollection();
  const { addTask, fetchRoomTasks } = useCrudHousekeeping();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [housekeeper, setHousekeeper] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [housekeepingLogs, setHousekeepingLogs] = useState([]);
  const { currentAdmin } = useUserStore();
  useEffect(() => {
    fetchCollection("rooms", setRooms, setLoading);
    fetchCollection("users", setUsers, setLoading);
  }, []);

  if (loading) {
    return (
      <div className="container flex pt-28 h-full justify-center items-center flex-col">
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

  const queryRooms = rooms.filter((room) => {
    if (
      room.roomType.includes(search) ||
      room.description.includes(search) ||
      room.roomNumber.includes(search)
    ) {
      return room;
    }
  });

  if (rooms.length <= 0) {
    return (
      <div className="container flex pt-28 h-full justify-center items-center flex-col">
        <img className="w-[200px]" src={empty} />
        <h1 className="text-3xl mt-5 opacity-50">There's no rooms yet</h1>
      </div>
    );
  }

  const houseKeepers = [
    { fullName: "Juan Dela Cruz" },
    { fullName: "Yasmin Chan" },
    { fullName: "Jean Monica" },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask({
      selectedRoom,
      housekeeper,
      serviceType,
      description,
    });
    toast.success("Assignment task successfully!");
    setSelectedRoom(null);
    setHousekeeper("");
    setServiceType("");
    setDescription("");
  };

  const handleViewLogs = (roomId) => {
    fetchRoomTasks(roomId, setHousekeepingLogs);

    setIsLogsModalOpen(true);
  };

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
          <Table.HeadCell>Room ID</Table.HeadCell>
          <Table.HeadCell>Room Type</Table.HeadCell>
          <Table.HeadCell>Price Per Night</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {queryRooms.map((room, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="font-bold text-lg text-red-500">
                {room.roomNumber}
              </Table.Cell>
              <Table.Cell>{room.roomType}</Table.Cell>
              <Table.Cell>{room.pricePerNight}</Table.Cell>
              <Table.Cell>{room.description}</Table.Cell>
              <Table.Cell>
                {room.status === "vacant" ? (
                  <Badge color="success">Completed</Badge>
                ) : (
                  <Badge>{room.status}</Badge>
                )}
              </Table.Cell>
              <Table.Cell className="flex items-center justify-center">
                <Button
                  className="mr-5"
                  onClick={() => handleViewLogs(room.id)}
                >
                  View Logs
                </Button>

                {currentAdmin?.role == "Housekeeping" && (
                  <Tooltip
                    content={
                      room.status !== "vacant"
                        ? "Already assigned a housekeeper"
                        : "Assign a housekeeper"
                    }
                  >
                    <Button
                      disabled={room.status !== "vacant"}
                      gradientMonochrome="failure"
                      onClick={() => setSelectedRoom(room)}
                      color="info"
                    >
                      Assign Housekeeper{" "}
                      <FaArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Tooltip>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Modal for Viewing Logs */}
      <Modal
        show={isLogsModalOpen}
        onClose={() => setIsLogsModalOpen(false)}
        size="7xl"
      >
        <Modal.Header>Housekeeping Logs</Modal.Header>
        <Modal.Body>
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell>Assign Date</Table.HeadCell>
              <Table.HeadCell>Housekeeper</Table.HeadCell>
              <Table.HeadCell>Service Type</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Completed At</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {housekeepingLogs.map((log) => {
                const assignDate = log.createdAt
                  ? moment(log.createdAt.toDate()).format("LLL")
                  : "invalid";

                const completedDate = log.completedAt
                  ? moment(log.completedAt.toDate()).format("LLL")
                  : "invalid";
                return (
                  <Table.Row key={log.id}>
                    <Table.Cell>{assignDate}</Table.Cell>
                    <Table.Cell>{log.housekeeper.fullName}</Table.Cell>
                    <Table.Cell>{log.serviceType}</Table.Cell>
                    <Table.Cell>{log.description}</Table.Cell>

                    <Table.Cell>
                      {log.completedAt ? completedDate : "---"}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge>{log.status}</Badge>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Modal.Body>
      </Modal>

      {/* Bottom Drawer for Assigning Housekeeper */}
      <BottomDrawer
        open={!!selectedRoom}
        handleClose={() => setSelectedRoom(null)}
      >
        <form onSubmit={handleFormSubmit} className="container p-10 mx-auto">
          <div className="header flex justify-between items-center mb-5">
            <h1 className="text-3xl font-bold flex items-center justify-start">
              Room Number: #{selectedRoom?.roomNumber}{" "}
              <Badge size="lg" className="ml-3 p-1 px-4">
                {selectedRoom?.status == "vacant"
                  ? "Completed"
                  : selectedRoom?.status}
              </Badge>
            </h1>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="housekeeper" value="Select Housekeeper" />
              <Dropdown
                label={
                  housekeeper == null
                    ? "Please Select Housekeeper"
                    : housekeeper.fullName
                }
              >
                {houseKeepers.map((user) => (
                  <Dropdown.Item onClick={() => setHousekeeper(user)}>
                    {user.fullName}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
            <div>
              <Label htmlFor="serviceType" value="Select Service Type" />
              <Select
                id="serviceType"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                required
              >
                <option value="" disabled>
                  Choose service type
                </option>
                <option value="cleaning">Cleaning</option>
                <option value="maintenance">Maintenance</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="description" value="Description" />
              <Textarea
                rows={5}
                id="description"
                placeholder="Provide additional details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end items-center">
            <Button
              type="button"
              gradientMonochrome="failure"
              onClick={() => setSelectedRoom(null)}
            >
              Cancel
            </Button>
            <Button className="ml-3" type="submit" gradientMonochrome="success">
              Assign Task
            </Button>
          </div>
        </form>
      </BottomDrawer>
    </div>
  );
}
