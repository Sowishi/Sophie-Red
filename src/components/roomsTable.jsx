"use client";

import { Button, Checkbox, Spinner, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import { CiSearch } from "react-icons/ci";
import empty from "../assets/empty-box.png";
import Lottie from "react-lottie";
import loader from "../assets/lotties/loader.json";
export function RoomsTable() {
  const { fetchCollection } = useFetchCollection();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCollection("rooms", setRooms, setLoading);
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

  if (rooms.length <= 0) {
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
          <Table.HeadCell>Room ID</Table.HeadCell>
          <Table.HeadCell>Room Type</Table.HeadCell>
          <Table.HeadCell>Price Per Night</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Adult Count</Table.HeadCell>
          <Table.HeadCell>Child Count</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {rooms.map((room, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="font-bold text-lg text-red-500">
                {room.roomNumber}
              </Table.Cell>
              <Table.Cell>{room.roomType}</Table.Cell>
              <Table.Cell>₱{room.pricePerNight}</Table.Cell>
              <Table.Cell>{room.description}</Table.Cell>
              <Table.Cell>{room.adultCount}</Table.Cell>
              <Table.Cell>{room.childCount}</Table.Cell>
              <Table.Cell>
                <Button color="failure">View Room</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
