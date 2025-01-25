import React, { useState } from "react";
import { Button, Modal, Rating } from "flowbite-react";
import anim from "../assets/rating.json";
import Lottie from "react-lottie";

const RatingLanding = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRating(0);
  };

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <div className="container mx-auto my-5">
      <h1>
        {" "}
        <div className="wrapper mb-5">
          <h1 className="text-3xl lg:text-5xl font-bold ">Leave A Rating</h1>
          <p className="opacity-50 text-lg">We want to hear from you</p>
        </div>
      </h1>
      <Lottie
        style={{ width: 500 }}
        options={{
          animationData: anim,
          autoplay: true,
        }}
      />
    </div>
  );
};

export default RatingLanding;
