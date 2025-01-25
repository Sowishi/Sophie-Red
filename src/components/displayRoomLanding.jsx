import { Button, Card, Carousel, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
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
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {rooms.map((room, index) => (
        <motion.div
          key={room.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card
            className={`p-4 shadow-lg transition-transform transform hover:scale-105 ${
              selectedRoom?.roomNumber === room.roomNumber
                ? "border-2 border-green-500"
                : "border border-gray-300 dark:border-gray-700"
            }`}
          >
            {/* ✅ Room Image Carousel */}
            <motion.div
              className="h-40 w-full cursor-pointer"
              onClick={() => openModal(roomImages[room.id] || [])}
              whileHover={{ scale: 1.02 }}
            >
              <Carousel slideInterval={3000} indicators={false}>
                {roomImages[room.id]?.map((img, idx) => (
                  <motion.img
                    key={idx}
                    src={img}
                    alt={`Room ${room.roomNumber} - Image ${idx + 1}`}
                    className="h-40 w-full object-cover rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </Carousel>
            </motion.div>

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
        </motion.div>
      ))}

      {/* ✅ Large Image Modal */}
      <Modal
        dismissible
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="6xl"
      >
        <Modal.Body>
          <motion.div
            className="w-full h-[500px] flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Carousel slideInterval={3000} indicators={true}>
              {selectedRoomImages.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`Selected Room Image ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </Carousel>
          </motion.div>
        </Modal.Body>
      </Modal>
    </motion.div>
  );
};

export default DisplayRoomLanding;
