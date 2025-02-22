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

const EventCards = ({ handleRoomSelection, selectedRoom }) => {
  return (
    <div className="flex flex-wrap gap-5">
      {eventRooms.map((room) => (
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
                <strong>Rent Price</strong> ₱{room.price.toLocaleString()}
              </p>
              <div className="opacity-50 my-3">
                <p>Lights & Sounds ₱3,500.00</p>
                <p>
                  (White screen projector w/ microphone 4 hours usage additional
                  ₱2,000/hr for exceeding hours)
                </p>
              </div>
              <Button
                className="mt-3 flex w-full items-center justify-center"
                onClick={() => handleRoomSelection({ eventName: room.name })}
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
      ))}
    </div>
  );
};

export default EventCards;
