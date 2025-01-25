import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
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
  const { fetchAllBookings } = useCrudBooking();

  useEffect(() => {
    fetchAllBookings(setBookings);
  }, []);

  // Process the bookings to calculate the number of bookings per day
  const bookingsPerDay = bookings.reduce((acc, booking) => {
    const checkInDate = new Date(booking.createdAt.seconds * 1000);
    const dateString = checkInDate.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"

    acc[dateString] = (acc[dateString] || 0) + 1; // Increment count for the date
    return acc;
  }, {});

  // Prepare the data for the chart
  const labels = Object.keys(bookingsPerDay).sort(); // Sorted dates
  const dataValues = labels.map((label) => bookingsPerDay[label]);

  const data = {
    labels,
    datasets: [
      {
        label: "Bookings Per Day",
        data: dataValues,
        backgroundColor: "#EE4C4C",
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
        text: "Number of Bookings Per Day",
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
