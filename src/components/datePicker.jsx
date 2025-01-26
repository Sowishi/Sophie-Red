import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker = ({ label, onChange, value }) => {
  const formatDateAsWords = (date) => {
    if (!date) return ""; // Return an empty string if date is null or undefined
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-start justify-start mx-1">
      <h1 className="text-sm text-white">{label}</h1>
      <DatePicker
        className="rounded-2xl border-0 text-gray-900"
        selected={value}
        onChange={onChange}
        placeholderText="Select a date" // Placeholder text when no date is selected
        dateFormat="MMMM d, yyyy" // Ensures consistency in display format
        minDate={new Date()} // Disable past dates by setting the minimum date to today
        customInput={
          <input
            className="rounded-2xl p-2 text-gray-900 bg-white w-full"
            value={formatDateAsWords(value)} // Display formatted value
            readOnly
          />
        }
      />
    </div>
  );
};
