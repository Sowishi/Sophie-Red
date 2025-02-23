import { useState } from "react";
import { Carousel, Modal, Button } from "flowbite-react";
import promo1 from "../assets/promotions/1.jpg";
import promo2 from "../assets/promotions/2.jpg";
import promo3 from "../assets/promotions/3.jpg";
import promo4 from "../assets/promotions/4.jpg";

const promotions = [promo1, promo2, promo3, promo4];

const Promotions = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center max-w-screen-sm">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Promotions
        </h2>
        <p className="mb-8 font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Experience the ultimate comfort and luxury at{" "}
          <span className="font-semibold">Sophie Red Hotel</span>. Enjoy
          exclusive deals, limited-time discounts, and seasonal promotions
          tailored just for you.
        </p>
      </div>
      <div className="w-full max-w-2xl h-[500px]">
        <Carousel slideInterval={3000} className="rounded-lg">
          {promotions.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Promotion ${index + 1}`}
              className="w-full h-auto object-cover cursor-pointer"
              onClick={() => handleImageClick(image)}
            />
          ))}
        </Carousel>
      </div>

      {/* Modal for full-screen image */}
      <Modal
        dismissible
        show={openModal}
        size="5xl"
        onClose={() => setOpenModal(false)}
      >
        {/* Modal Header with Close Button */}
        <Modal.Header>
          <h1>Promotional Voucher</h1>
        </Modal.Header>

        {/* Modal Body with Image */}
        <Modal.Body>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected Promotion"
              className="w-full h-full object-contain"
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Promotions;
