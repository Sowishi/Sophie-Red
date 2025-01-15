import { Button, Dropdown, Table, TextInput } from "flowbite-react";
import { CustomDatePicker } from "./datePicker";
import logo from "../assets/logo.png";
import { ImMenu } from "react-icons/im";
import { BottomDrawer } from "./bottomDrawer";
import { useRef, useState } from "react";
import useUserStore from "../utils/zustand";
import { useNavigate } from "react-router-dom";
import { CustomModal } from "./customModal";
import loader from "../assets/lotties/loader.json";
import Lottie from "react-lottie";
import { toast } from "react-toastify";
import useCrudBooking from "../hooks/useCrudBooking";
import { FaArrowRight } from "react-icons/fa6";

const ClientHeader = () => {
  const [bookNowModal, setBookNowModal] = useState(false);
  const [bookingModal, setBookingModal] = useState(false);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [voucher, setVoucher] = useState("");
  const [persons, setPersons] = useState({ adults: 1, kids: 0 });

  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef();
  const navigation = useNavigate();

  const { fetchAvailableRoom } = useCrudBooking();

  const handleSubmit = async () => {
    setLoading(true);
    if (!arrivalDate || !departureDate) {
      toast.error("Please select your check in date");
      return;
    }
    setBookingModal(true);
    await fetchAvailableRoom(persons, setRooms);
    setLoading(false);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(43deg, rgba(225,240,247,1) 1%, rgb(162,0,0) 45%)",
      }}
      className="header bg-white p-5 px-10 flex items-center justify-between fixed w-full z-10"
    >
      <img
        onClick={() => navigation("/")}
        className="w-[130px] hidden xl:flex cursor-pointer"
        src={logo}
        alt="Logo"
      />
      <ImMenu size={25} className="text-white font-bold xl:hidden" />

      <Button
        onClick={() => setBookNowModal(true)}
        className="lg:hidden"
        gradientMonochrome="cyan"
      >
        Book Now
      </Button>

      <div className="dates hidden flex-1 lg:flex items-center justify-center">
        <CustomDatePicker
          label={"Arrival Date"}
          onChange={(date) => setArrivalDate(date)}
          value={arrivalDate}
        />
        <CustomDatePicker
          label={"Departure Date"}
          onChange={(date) => setDepartureDate(date)}
          value={departureDate}
        />
        <div className="persons ml-3">
          <h1 className="text-sm text-white">Persons</h1>
          <Dropdown
            ref={dropdownRef}
            className="rounded-2xl text-nowrap"
            color="light"
            dismissOnClick={false}
            label={`${persons.adults} Adults + ${persons.kids} Kids`}
          >
            <Dropdown.Header>
              <span className="block text-lg">Guest for room</span>
            </Dropdown.Header>
            <div className="p-5">
              <div className="wrapper flex items-center justify-between">
                <h1>Adults</h1>
                <div className="wrapper flex items-center">
                  <Button
                    gradientMonochrome="failure"
                    size="xs"
                    onClick={() =>
                      setPersons((prev) => ({
                        ...prev,
                        adults: Math.max(1, prev.adults - 1),
                      }))
                    }
                  >
                    -
                  </Button>
                  <Button
                    gradientMonochrome="success"
                    className="mx-2"
                    size="xs"
                    onClick={() =>
                      setPersons((prev) => ({
                        ...prev,
                        adults: prev.adults + 1,
                      }))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="wrapper mt-5 flex items-center justify-between">
                <h1>Kids</h1>
                <div className="wrapper flex items-center">
                  <Button
                    gradientMonochrome="failure"
                    size="xs"
                    onClick={() =>
                      setPersons((prev) => ({
                        ...prev,
                        kids: Math.max(0, prev.kids - 1),
                      }))
                    }
                  >
                    -
                  </Button>
                  <Button
                    gradientMonochrome="success"
                    className="mx-2"
                    size="xs"
                    onClick={() =>
                      setPersons((prev) => ({
                        ...prev,
                        kids: prev.kids + 1,
                      }))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </Dropdown>
        </div>
        <div className="voucher ml-2">
          <h1 className="text-sm text-white">Voucher</h1>
          <TextInput
            placeholder="Promo Code"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
        </div>
        <div className="wrapper ml-3">
          <h1 className="text-sm text-white">Availability</h1>
          <Button onClick={handleSubmit}>Check Availability</Button>
        </div>
      </div>

      {/* Modals */}
      <BottomDrawer
        red={true}
        open={bookNowModal}
        handleClose={() => setBookNowModal(false)}
      >
        <div className="container mx-auto min-h-[450px]">
          <div className="flex flex-col items-center justify-center mx-5 py-5">
            <img className="w-[130px]" src={logo} alt="Logo" />
          </div>

          <div className="dates flex-col">
            <CustomDatePicker
              label={"Arrival Date"}
              onChange={(date) => setArrivalDate(date)}
              value={arrivalDate}
            />
            <CustomDatePicker
              label={"Departure Date"}
              onChange={(date) => setDepartureDate(date)}
              value={departureDate}
            />

            <div className="voucher my-3">
              <h1 className="text-sm text-white">Voucher</h1>
              <TextInput placeholder="Promo Code" />
            </div>
            <div className="persons mb-3">
              <h1 className="text-sm text-white">Persons</h1>
              <Dropdown
                ref={dropdownRef}
                className="rounded-2xl text-nowrap"
                color="light"
                dismissOnClick={false}
                label={`${persons.adults} Adults + ${persons.kids} Kids`}
              >
                <Dropdown.Header>
                  <span className="block text-lg">Guest for room</span>
                </Dropdown.Header>
                <div className="p-5">
                  <div className="wrapper flex items-center justify-between">
                    <h1>Adults</h1>
                    <div className="wrapper flex items-center">
                      <Button
                        gradientMonochrome="failure"
                        size="xs"
                        onClick={() =>
                          setPersons((prev) => ({
                            ...prev,
                            adults: Math.max(1, prev.adults - 1),
                          }))
                        }
                      >
                        -
                      </Button>
                      <Button
                        gradientMonochrome="success"
                        className="mx-2"
                        size="xs"
                        onClick={() =>
                          setPersons((prev) => ({
                            ...prev,
                            adults: prev.adults + 1,
                          }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="wrapper mt-5 flex items-center justify-between">
                    <h1>Kids</h1>
                    <div className="wrapper flex items-center">
                      <Button
                        gradientMonochrome="failure"
                        size="xs"
                        onClick={() =>
                          setPersons((prev) => ({
                            ...prev,
                            kids: Math.max(0, prev.kids - 1),
                          }))
                        }
                      >
                        -
                      </Button>
                      <Button
                        gradientMonochrome="success"
                        className="mx-2"
                        size="xs"
                        onClick={() =>
                          setPersons((prev) => ({
                            ...prev,
                            kids: prev.kids + 1,
                          }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </Dropdown>
            </div>
            <div className="wrapper mb-5">
              <h1 className="text-sm text-white">Availability</h1>

              <Button className="w-full py-2">Check Availability</Button>
            </div>
          </div>
        </div>
      </BottomDrawer>

      {/* Booking Modal */}
      <CustomModal
        size={"5xl"}
        title={`Booking for ${persons.adults} Adults & ${persons.kids} Kids `}
        open={bookingModal}
        handleClose={() => {
          setBookingModal(false);
          setRooms(null);
        }}
        hideFooter={true}
      >
        {loading && (
          <Lottie
            style={{ width: 150 }}
            options={{
              animationData: loader,
              autoplay: true,
            }}
          />
        )}
        {rooms !== null && rooms.length >= 1 && (
          <Table hoverable striped>
            <Table.Head>
              <Table.HeadCell>Room ID</Table.HeadCell>
              <Table.HeadCell>Room Type</Table.HeadCell>
              <Table.HeadCell>Price Per Night</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Adult Count</Table.HeadCell>
              <Table.HeadCell>Child Count</Table.HeadCell>

              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {rooms.map((room, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="font-bold text-lg text-red-500">
                    {room.roomNumber}
                  </Table.Cell>
                  <Table.Cell>{room.roomType}</Table.Cell>
                  <Table.Cell>₱{room.pricePerNight}</Table.Cell>
                  <Table.Cell>{room.description}</Table.Cell>
                  <Table.Cell>{room.adultCount}</Table.Cell>
                  <Table.Cell>{room.childCount}</Table.Cell>

                  <Table.Cell className="flex items-center justify-center">
                    <Button onClick={() => setSelectedRoom(room)} color="info">
                      View Room <FaArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </CustomModal>
    </div>
  );
};

export default ClientHeader;
