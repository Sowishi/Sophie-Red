import { Button, Card, Carousel, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import useCrudRooms from "../hooks/useCrudRooms";

const DisplayRoomLanding = ({ rooms, selectedRoom, handleRoomSelection }) => {
  const { fetchRoomImagesCarousel } = useCrudRooms();
  const [roomImages, setRoomImages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoomImages, setSelectedRoomImages] = useState([]);

  useEffect(() => {
    const fetchImagesForRooms = async () => {
      const imagesMap = {};
      for (const room of rooms) {
        try {
          const images = await fetchRoomImagesCarousel(room.id);
          imagesMap[room.id] =
            images.length > 0 ? images : ["https://placehold.co/600x400"];
        } catch (error) {
          console.error(`Error fetching images for Room ${room.id}:`, error);
          imagesMap[room.id] = ["https://placehold.co/600x400"];
        }
      }
      setRoomImages(imagesMap);
    };

    if (rooms.length > 0) {
      fetchImagesForRooms();
    }
  }, [rooms, fetchRoomImagesCarousel]);

  const openModal = (images) => {
    setSelectedRoomImages(images);
    setIsModalOpen(true);
  };

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
          <div
            className="h-40 w-full cursor-pointer"
            onClick={() => openModal(roomImages[room.id] || [])}
          >
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
            <strong>Guest Allowed:</strong> {room.adultCount} Adult &{" "}
            {room.childCount} Kids
          </p>
        </Card>
      ))}

      {/* ✅ Large Image Modal */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="6xl"
      >
        <Modal.Header>Room Images</Modal.Header>
        <Modal.Body>
          <div className="w-full h-[500px] flex justify-center items-center">
            <Carousel slideInterval={3000} indicators={true}>
              {selectedRoomImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Selected Room Image ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ))}
            </Carousel>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DisplayRoomLanding;
