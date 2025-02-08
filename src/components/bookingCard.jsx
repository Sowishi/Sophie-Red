import { Badge, Card, Dropdown } from "flowbite-react";
import moment from "moment";
import { BsThreeDots } from "react-icons/bs";

const BookingCard = ({ booking }) => {
  return (
    <Card className="max-w-sm my-3">
      <div className="header flex items-center justify-between">
        <Badge
          color={booking.bookType == "room" ? "failure" : "info"}
          className="p-2 px-10 rounded-lg"
        >
          <h1 className="uppercase">{booking.bookType}</h1>
        </Badge>
        <Dropdown
          arrowIcon={false}
          inline
          label={<BsThreeDots className="cursor-pointer text-xl" />}
        >
          <Dropdown.Item onClick={() => console.log("View Details")}>
            View Details
          </Dropdown.Item>

          <Dropdown.Item onClick={() => console.log("Cancel Booking")}>
            Cancel Booking
          </Dropdown.Item>
        </Dropdown>
      </div>
      <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {booking.roomDetails.roomType || booking.roomDetails?.eventName}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {booking.roomDetails.description ||
          "A fully equipped and versatile event venue, perfect for meetings, conferences, and all types of gatherings."}
      </p>
      <div className="footer mt-2">
        <hr className="mb-2" />
        <div className="content flex justify-between items-center">
          <div className="flex items-center justify-center">
            <img
              className="rounded-full mr-2"
              width={30}
              src={booking.currentUser.photoURL}
              alt=""
            />
            {booking.currentUser.name}
          </div>
          <h1>{moment(booking.checkInDate?.toDate()).format("LL")}</h1>
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
