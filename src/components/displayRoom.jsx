import { Button, Card, Carousel, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { motion } from "framer-motion"; // ✅ Import Framer Motion
import useCrudRooms from "../hooks/useCrudRooms";

const DisplayRoom = ({ roomID }) => {
  const { fetchRoomImages } = useCrudRooms();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchRoomImages(roomID, setImages);
  }, []);

  console.log(images);

  return (
    <motion.div
      className="w-full h-[500px] flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Carousel slideInterval={3000} indicators={true}>
        {images.map((img, idx) => (
          <motion.img
            key={idx}
            src={img.image}
            alt={`Selected Room Image ${idx + 1}`}
            className="w-full h-full object-cover rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </Carousel>
    </motion.div>
  );
};

export default DisplayRoom;
