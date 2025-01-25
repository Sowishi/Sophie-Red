import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useCrudRooms from "../hooks/useCrudRooms";

const DisplayRoom = ({ roomID }) => {
  const { fetchRoomImages } = useCrudRooms();
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoomImages(roomID, (fetchedImages) => {
      setImages(fetchedImages);
      setLoading(false);
    });
  }, []);

  // Auto-slide effect every 3 seconds
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const slideVariants = {
    initial: { opacity: 0, x: 100 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.8, ease: "easeIn" },
    },
  };

  // Handle manual navigation
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <motion.div
      className="relative w-full h-[500px] flex justify-center items-center overflow-hidden bg-gray-100 rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading ? (
        // Loader Spinner
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      ) : images.length > 0 ? (
        <>
          {/* Image Transition */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex].image}
              alt={`Room Image ${currentIndex + 1}`}
              className="w-full h-full object-cover rounded-lg absolute"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            />
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-900 transition"
            onClick={handlePrev}
          >
            <FaArrowLeft />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full shadow-md hover:bg-gray-900 transition"
            onClick={handleNext}
          >
            <FaArrowRight />
          </button>
        </>
      ) : (
        // No images available message
        <p className="text-gray-500">No images available</p>
      )}
    </motion.div>
  );
};

export default DisplayRoom;
