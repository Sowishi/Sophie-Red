import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ButtonGroup, Button } from "flowbite-react";
import useCrudBooking from "../hooks/useCrudBooking";
import { animate } from "framer-motion";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("day"); // Filter state: "day" or "month"
  const { fetchAllBookings } = useCrudBooking();

  useEffect(() => {
    fetchAllBookings(setBookings);
  }, []);

  // Group bookings by date or month based on the filter
  const salesData = bookings.reduce((acc, booking) => {
    const checkInDate = new Date(booking.checkInDate.seconds * 1000);
    const key =
      filter === "day"
        ? checkInDate.toISOString().split("T")[0] // "YYYY-MM-DD" for daily
        : `${checkInDate.getFullYear()}-${String(
            checkInDate.getMonth() + 1
          ).padStart(2, "0")}`; // "YYYY-MM" for monthly

    acc[key] = (acc[key] || 0) + booking.totalPrice; // Sum sales for the key
    return acc;
  }, {});

  // Prepare the data for the chart
  const labels = Object.keys(salesData).sort(); // Sorted dates or months
  const dataValues = labels.map((label) => salesData[label]);

  const data = {
    labels,
    datasets: [
      {
        label: filter === "day" ? "Sales Per Day" : "Sales Per Month",
        data: dataValues,
        borderColor: "#4A90E2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        pointBackgroundColor: "#4A90E2",
        pointBorderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: filter === "day" ? "Sales Per Day" : "Sales Per Month",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: filter === "day" ? "Date" : "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Sales",
        },
      },
    },
  };

  return (
    <div className="chart-container">
      {/* Button group to toggle between daily and monthly view */}
      <div className="mb-4 flex justify-start items-center mt-5">
        <ButtonGroup>
          <Button
            color={filter === "day" ? "info" : "gray"}
            onClick={() => setFilter("day")}
          >
            Day
          </Button>
          <Button
            color={filter === "month" ? "info" : "gray"}
            onClick={() => setFilter("month")}
          >
            Month
          </Button>
        </ButtonGroup>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
