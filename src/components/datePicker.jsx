import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker = ({ label }) => {
  const [startDate, setStartDate] = useState(new Date());

  const formatDateAsWords = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-start justify-start mx-3">
      <h1 className="text-sm text-white">{label}</h1>
      <DatePicker
        className="rounded-2xl border-0 text-gray-900"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        value={formatDateAsWords(startDate)} // Format date inside the input
      />
    </div>
  );
};
