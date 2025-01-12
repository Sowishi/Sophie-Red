import React from "react";
import { FaUtensils, FaCoffee, FaConciergeBell } from "react-icons/fa";
import { MdFreeBreakfast, MdSpa } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { GiBeachBucket } from "react-icons/gi";

const Amenities = () => {
  const amenities = [
    {
      category: "Food and Drinks",
      items: [
        { icon: <FaUtensils />, text: "Food and Drinks" },
        { icon: <FaConciergeBell />, text: "Room service [24-hour]" },
        { icon: <FaCoffee />, text: "Coffee shop" },
        { icon: <MdFreeBreakfast />, text: "Breakfast [free]" },
      ],
    },
    {
      category: "Wellness",
      items: [{ icon: <MdSpa />, text: "Massage" }],
    },
    {
      category: "Activities",
      items: [{ icon: <GiBeachBucket />, text: "Beach" }],
    },
  ];

  return (
    <div className="p-4 flex text-gray-800 mx-10 mt-5 border shadow-sm rounded">
      {amenities.map((section) => (
        <div key={section.category} className="mb-6 basis-4/12">
          <h2 className="text-lg font-bold mb-4">{section.category}</h2>
          <ul className="space-y-2">
            {section.items.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-blue-500 text-xl">{item.icon}</span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
