import React from "react";

const ParkingAndLandmarks = () => {
  const landmarks = [
    { name: "Agutayan Island", distance: "5.9 km" },
    { name: "Laguindingan Airport", distance: "31.6 km" },
    { name: "Camiguin Airport", distance: "65.4 km" },
    { name: "Bancasi Airport", distance: "87.3 km" },
    { name: "Labo Airport", distance: "112.3 km" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border mt-10 shadow-sm w-full max-w-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Parking</h2>
        <p className="text-lg text-green-500">FREE</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Closest Landmarks
        </h2>
        <ul className="space-y-3">
          {landmarks.map((landmark, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l7-7-7-7"
                />
              </svg>
              <span className="text-lg">{landmark.name}</span>
              <span className="ml-2 text-sm text-gray-500">
                {landmark.distance}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ParkingAndLandmarks;
