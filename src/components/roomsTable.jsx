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
export function RoomsTable() {
  const { fetchCollection } = useFetchCollection();
  const { addRoomImage, fetchRoomImages, deleteRoom } = useCrudRooms();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingImage, setFetchingImage] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [uploadModal, setUploadModal] = useState(false);
  const [photo, setPhoto] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchCollection("rooms", setRooms, setLoading);
  }, []);

  const handleFetchImages = async () => {
    if (selectedRoom) {
      setFetchingImage(true);
      await fetchRoomImages(selectedRoom?.id, setImages);
      setFetchingImage(false);
    }
  };

  useEffect(() => {
    if (selectedRoom) {
      handleFetchImages();
    }
  }, [selectedRoom]);

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

  const handleImageUpload = async (file) => {
    const output = await handleFileUpload(file);
    setPhoto(output);
  };

  const handleSubmit = async () => {
    if (photo) {
      await addRoomImage(selectedRoom?.id, photo);
      setUploadModal(false);
      setPhoto(null);
      setSelectedRoom(null);
      toast.success("Successfully added a picture.");
    } else {
      toast.error("Please Upload a photo before uploading...");
    }
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
          <Table.HeadCell>Adult Count</Table.HeadCell>
          <Table.HeadCell>Child Count</Table.HeadCell>

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
              <Table.Cell>₱{room.pricePerNight}</Table.Cell>
              <Table.Cell>{room.description}</Table.Cell>
              <Table.Cell>{room.adultCount}</Table.Cell>
              <Table.Cell>{room.childCount}</Table.Cell>

              <Table.Cell className="flex items-center justify-center">
                <Button onClick={() => setSelectedRoom(room)} color="info">
                  View <FaArrowRight className="ml-2 h-5 w-5" />
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
          ))}
        </Table.Body>
      </Table>

      {/* Modals */}
      <BottomDrawer
        open={selectedRoom}
        handleClose={() => setSelectedRoom(null)}
      >
        <div className="container p-10 mx-auto h-[600px]">
          {/* Header of bottom drawer */}
          <div className="header flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center justify-start">
              Room Number: #{selectedRoom?.roomNumber}{" "}
              <Badge size="lg" className="ml-3 p-1 px-4">
                {selectedRoom?.status == "vacant"
                  ? "Completed"
                  : selectedRoom?.status}
              </Badge>
            </h1>
            <Button
              onClick={() => setUploadModal(true)}
              gradientMonochrome="failure"
            >
              Upload Photo <AiOutlineCloudUpload className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="wrapper p-20 w-full ">
            {fetchingImage ? (
              <>
                <h1 className="text-3xl text-white text-center mt-5">
                  Loading...
                </h1>
              </>
            ) : (
              <>
                {images.length >= 1 ? (
                  <CustomGallery
                    setSelectedRoom={setSelectedRoom}
                    images={images}
                  />
                ) : (
                  <h1 className="text-white text-3xl font-bold">
                    There's no room images yet.
                  </h1>
                )}
              </>
            )}
          </div>
        </div>
      </BottomDrawer>
      <CustomModal
        onSubmit={handleSubmit}
        title={"Upload Photo"}
        open={uploadModal}
        handleClose={() => setUploadModal(false)}
      >
        <CustomInput
          onChange={(event) => handleImageUpload(event.target.files[0])}
          type={"file"}
          label={"Upload Photo"}
        />
        {photo && (
          <div className="flex justify-center items-center p-10">
            <img style={{ width: 300, height: 300 }} src={photo} alt="" />
          </div>
        )}
      </CustomModal>
    </div>
  );
}
