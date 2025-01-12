import React from "react";

export const Facilities = () => {
  const facilities = [
    "Beach",
    "Free Wi-Fi",
    "Swimming pool",
    "Free parking",
    "Front desk [24-hour]",
    "Water sports",
    "Massage",
    "Airport transfer",
  ];

  return (
    <div className="mx-10 mt-5 rounded-lg shadow-sm border p-5">
      <h1 className="font-semibold text-2xl">Facilities</h1>
      <div className="grid grid-cols-2 gap-4 bg-white p-6 ">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-lg">{facility}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
