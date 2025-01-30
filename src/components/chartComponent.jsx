import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ButtonGroup, Button } from "flowbite-react";
import useCrudBooking from "../hooks/useCrudBooking";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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

  // Process the bookings to calculate the number of bookings per day or per month
  const bookingsPerPeriod = bookings.reduce((acc, booking) => {
    const checkInDate = new Date(booking.createdAt.seconds * 1000);
    const dateKey =
      filter === "day"
        ? moment(checkInDate).format("LL") // Format as "YYYY-MM-DD" for daily
        : moment(checkInDate).format("YYYY-MM"); // Format as "YYYY-MM" for monthly

    acc[dateKey] = (acc[dateKey] || 0) + 1; // Increment count for the period
    return acc;
  }, {});

  // Prepare the data for the chart
  const labels = Object.keys(bookingsPerPeriod).sort(); // Sorted periods (dates or months)
  const dataValues = labels.map((label) => bookingsPerPeriod[label]);

  const data = {
    labels,
    datasets: [
      {
        label: filter === "day" ? "Bookings Per Day" : "Bookings Per Month",
        data: dataValues,
        backgroundColor: "#E22929",
        borderColor: "#4A90E2",
        borderWidth: 1,
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
        text:
          filter === "day"
            ? "Number of Bookings Per Day"
            : "Number of Bookings Per Month",
      },
    },
  };

  return (
    <div className="chart-container">
      {/* Button group to toggle between daily and monthly view */}
      <div className="mb-4 flex justify-between items-center mt-5">
        <div className="flex flex-col">
          <h1 className="font-medium text-2xl">Booking Chart</h1>
          <p className="text-gray-500">
            Frequency of booking per day and months
          </p>
        </div>
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
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
