import { Badge, Button, Modal, Table } from "flowbite-react";
import logo from "../assets/logo.png";
import moment from "moment";

const PDFPreview = ({
  filteredBookings,
  isModalOpen,
  handleClose,
  startDate,
  endDate,
  toPDF,
}) => {
  return (
    <Modal size="6xl" show={isModalOpen} onClose={handleClose}>
      <Modal.Header>PDF Preview</Modal.Header>
      <Modal.Body>
        <div className="text-center border-b pb-4 mb-4">
          <div className="flex justify-center items-center">
            <img className="w-[200px]" src={logo} alt="Logo" />
          </div>
          <h2 className="text-xl font-bold">
            SOPHIERED HOTEL AND ONSHORE RESTAURANT
          </h2>
          <p className="text-sm">
            Purok 9 Bobontugan , 9003, Jasaan, Misamis Oriental, Philippines
          </p>
          <p className="text-sm">GRACE A. JARDIN - Prop.</p>
          <p className="text-sm">VAT REG. TIN: 254-650-511-0000</p>
        </div>
        <h2 className="text-xl font-bold mb-4">
          Booking Report {""}{" "}
          {startDate && endDate && (
            <span className="ml-3 text-red-500 opacity-85">
              {moment(startDate.toDateString()).format("LL")} -{" "}
              {moment(endDate.toDateString()).format("LL")}
            </span>
          )}
        </h2>
        <Table hoverable striped>
          <Table.Head>
            <Table.HeadCell>Guest Name</Table.HeadCell>
            <Table.HeadCell>Room Number</Table.HeadCell>
            <Table.HeadCell>Total Price</Table.HeadCell>
            <Table.HeadCell>Payment Status</Table.HeadCell>
            <Table.HeadCell>Balance</Table.HeadCell>
            <Table.HeadCell>Check-In Date</Table.HeadCell>
            <Table.HeadCell>Check-Out Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredBookings.map((booking, index) => {
              const date = booking.checkOutDate
                ? moment(booking.checkOutDate.toDate()).format("LLL")
                : "Invalid Date";
              const checkIn = booking.checkInDate
                ? moment(booking.checkInDate.toDate()).format("LLL")
                : "Invalid Date";

              return (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="font-bold text-lg text-red-500">
                    {booking.currentUser.name}
                  </Table.Cell>
                  <Table.Cell>
                    {booking.roomDetails.roomNumber || "Event"}
                  </Table.Cell>
                  <Table.Cell>₱{booking.totalPrice}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={
                        booking.paymentStatus === "full" ? "success" : "failure"
                      }
                    >
                      {booking.paymentStatus === "full"
                        ? "Fully Paid"
                        : "Unpaid"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    {booking.paymentStatus === "full" ? (
                      <Badge color="success">No Balance</Badge>
                    ) : (
                      <h1>₱{booking.totalPrice - booking.downpayment}</h1>
                    )}
                  </Table.Cell>
                  <Table.Cell>{checkIn}</Table.Cell>
                  <Table.Cell>{date}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Modal.Body>
      <Modal.Footer className="flex justify-end items-center">
        <Button onClick={handleClose} gradientMonochrome="info">
          Cancel
        </Button>
        <Button gradientMonochrome="failure" onClick={() => toPDF()}>
          Download PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PDFPreview;
