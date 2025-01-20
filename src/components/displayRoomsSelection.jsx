import { Button, Card, Carousel } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import useCrudRooms from "../hooks/useCrudRooms";

const DisplayRoomsSelection = ({
  rooms,
  selectedRoom,
  handleRoomSelection,
}) => {
  const { fetchRoomImagesCarousel } = useCrudRooms();
  const [roomImages, setRoomImages] = useState({});

  useEffect(() => {
    const fetchImagesForRooms = async () => {
      const imagesMap = {};
      for (const room of rooms) {
        try {
          const images = await fetchRoomImagesCarousel(room.id);
          imagesMap[room.id] =
            images.length > 0 ? images : ["https://via.placeholder.com/300"];
        } catch (error) {
          console.error(`Error fetching images for Room ${room.id}:`, error);
          imagesMap[room.id] = ["https://via.placeholder.com/300"];
        }
      }
      setRoomImages(imagesMap);
    };

    if (rooms.length > 0) {
      fetchImagesForRooms();
    }
  }, [rooms, fetchRoomImagesCarousel]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <Card
          key={room.id}
          className={`p-4 shadow-lg transition-transform transform hover:scale-105 ${
            selectedRoom?.roomNumber === room.roomNumber
              ? "border-2 border-green-500"
              : "border border-gray-300 dark:border-gray-700"
          }`}
        >
          {/* ✅ Room Image Carousel */}
          <div className="h-40 w-full">
            <Carousel slideInterval={3000} indicators={false}>
              {roomImages[room.id]?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Room ${room.roomNumber} - Image ${idx + 1}`}
                  className="h-40 w-full object-cover rounded-md"
                />
              ))}
            </Carousel>
          </div>

          <h3 className="text-xl font-semibold text-red-500 mt-3">
            Room {room.roomNumber}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Type:</strong> {room.roomType}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Price Per Night:</strong> ₱{room.pricePerNight}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <strong>Description:</strong> {room.description}
          </p>

          {/* ✅ Select Button */}
          <Button
            className="mt-3 flex items-center justify-center"
            onClick={() => handleRoomSelection(room)}
            color={
              selectedRoom?.roomNumber === room.roomNumber ? "success" : "light"
            }
          >
            {selectedRoom?.roomNumber === room.roomNumber
              ? "Selected"
              : "Select Room"}
            {selectedRoom?.roomNumber === room.roomNumber && (
              <FaCheck className="ml-2 h-5 w-5" />
            )}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default DisplayRoomsSelection;
