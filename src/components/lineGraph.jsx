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
import moment from "moment"; // Import moment.js

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
        ? moment(checkInDate).format("LL") // Format as "LLL" for daily
        : moment(checkInDate).format("YYYY-MM"); // Format as "YYYY-MM" for monthly

    acc[key] = (acc[key] || 0) + booking.totalPrice; // Sum sales for the key
    return acc;
  }, {});

  // Calculate total sales from all time
  const totalSales = bookings.reduce(
    (total, booking) => total + Number(booking.totalPrice),
    0
  );

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
        borderWidth: 5,
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
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
  };

  return (
    <div className="chart-container">
      {/* Total Sales from all time */}
      <div className="flex justify-between items-center my-4">
        <div className="text-3xl font-bold">
          Total Sales: ₱{totalSales.toLocaleString()}
        </div>
        {/* Button group to toggle between daily and monthly view */}
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
