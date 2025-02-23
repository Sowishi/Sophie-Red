import { useState } from "react";
import { Button, Card } from "flowbite-react";
import { FaCheck } from "react-icons/fa6";
import eventBG from "../assets/event.jpg";
import pool from "../assets/pool.jpg";

const eventRooms = [
  {
    name: "Functional Room",
    image: eventBG,
    price: 10000,
  },
  {
    name: "Pool Area",
    image: pool,
    price: 10000,
  },
];

const eventTypes = [
  { type: "Wedding", duration: 4 }, // max 4 hours
  { type: "Debut", duration: 4 }, // max 4 hours
  { type: "Seminar", duration: 24 }, // full day
];

// Generate hourly time slots (e.g., 1:00 PM, 2:00 PM)
const generateTimeSlots = () => {
  const times = [];
  for (let hour = 8; hour <= 22; hour++) {
    // Convert 24-hour format to 12-hour format
    const displayHour = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? "PM" : "AM";
    times.push({ value: `${hour}:00`, label: `${displayHour}:00 ${ampm}` });
  }
  return times;
};

const timeSlots = generateTimeSlots();

const EventCards = ({ handleRoomSelection, selectedRoom }) => {
  const [selectedDetails, setSelectedDetails] = useState({});

  const handleSelectChange = (roomName, field, value) => {
    setSelectedDetails((prev) => ({
      ...prev,
      [roomName]: { ...prev[roomName], [field]: value },
    }));
  };

  const handleSelectRoom = (roomName) => {
    const details = selectedDetails[roomName] || {};
    if (!details.eventType || !details.startTime || !details.endTime) {
      alert("Please select event type and time.");
      return;
    }

    const selectedEvent = eventTypes.find(
      (et) => et.type === details.eventType
    );

    const startHour = parseInt(details.startTime.split(":")[0]);
    const endHour = parseInt(details.endTime.split(":")[0]);
    const diffHours = endHour - startHour;

    if (diffHours > selectedEvent.duration) {
      alert(
        `The maximum duration for a ${details.eventType} is ${selectedEvent.duration} hours.`
      );
      return;
    }

    handleRoomSelection({
      eventName: roomName,
      eventType: details.eventType,
      startTime: details.startTime,
      endTime: details.endTime,
    });
  };

  return (
    <div className="flex flex-wrap gap-5">
      {eventRooms.map((room) => {
        const details = selectedDetails[room.name] || {};

        return (
          <div key={room.name} className="basis-full lg:basis-4/12">
            <Card
              className="max-w-sm"
              imgAlt={`${room.name} Image`}
              imgSrc={room.image}
            >
              <div className="p-4">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {room.name}
                </h5>
                <p className="text-gray-600 dark:text-gray-300 mt-5">
                  <strong>Rent Price:</strong> ₱{room.price.toLocaleString()}
                </p>

                <ul className="opacity-50 my-3 list-disc list-inside">
                  <li>Lights & Sounds: ₱3,500.00</li>
                  <li>White screen projector w/ microphone</li>
                  <li>Minimum of 150 persons</li>
                </ul>

                {/* Event Type Selection */}
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Select Event Type
                  </label>
                  <select
                    className="w-full p-2 mt-1 border rounded-md dark:bg-gray-800 dark:text-white"
                    value={details.eventType || ""}
                    onChange={(e) =>
                      handleSelectChange(room.name, "eventType", e.target.value)
                    }
                  >
                    <option value="">-- Select Event --</option>
                    {eventTypes.map((event) => (
                      <option key={event.type} value={event.type}>
                        {event.type} (Max: {event.duration} hrs)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Selection */}
                {details.eventType && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-white">
                      Select Start & End Time
                    </label>
                    <div className="flex gap-2 mt-1">
                      {/* Start Time Dropdown */}
                      <select
                        className="w-1/2 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                        value={details.startTime || ""}
                        onChange={(e) =>
                          handleSelectChange(
                            room.name,
                            "startTime",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Start Time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value}>
                            {slot.label}
                          </option>
                        ))}
                      </select>

                      {/* End Time Dropdown */}
                      <select
                        className="w-1/2 p-2 border rounded-md dark:bg-gray-800 dark:text-white"
                        value={details.endTime || ""}
                        onChange={(e) =>
                          handleSelectChange(
                            room.name,
                            "endTime",
                            e.target.value
                          )
                        }
                        disabled={!details.startTime} // Prevent selection before choosing start time
                      >
                        <option value="">End Time</option>
                        {timeSlots
                          .filter(
                            (slot) =>
                              parseInt(slot.value.split(":")[0]) >
                              parseInt(details.startTime?.split(":")[0] || 0)
                          )
                          .map((slot) => (
                            <option key={slot.value} value={slot.value}>
                              {slot.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Select Button */}
                <Button
                  className="mt-3 flex w-full items-center justify-center"
                  onClick={() => handleSelectRoom(room.name)}
                  color={
                    selectedRoom?.eventName === room.name ? "success" : "light"
                  }
                >
                  {selectedRoom?.eventName === room.name
                    ? "Selected"
                    : "Select Room"}
                  {selectedRoom?.eventName === room.name && (
                    <FaCheck className="ml-2 h-5 w-5" />
                  )}
                </Button>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default EventCards;
