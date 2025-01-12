import { Button, Dropdown, TextInput } from "flowbite-react";
import { CustomDatePicker } from "./datePicker";
import logo from "../assets/logo.png";
import { CiLogin } from "react-icons/ci";
import { ImMenu } from "react-icons/im";
import { BottomDrawer } from "./bottomDrawer";
import { useState } from "react";

const ClientHeader = () => {
  const [bookNowModal, setBookNowModal] = useState(false);

  return (
    <div
      style={{
        background: "rgb(247,65,65)",
        background:
          "linear-gradient(43deg, rgba(225,240,247,1) 1%, rgb(162,0,0) 45%)",
      }}
      className="header bg-white p-5 px-10 flex items-center justify-between  w-full z-10"
    >
      <img className="w-[130px] hidden xl:flex" src={logo} alt="Logo" />
      <ImMenu size={25} className="text-white font-bold xl:hidden" />

      <Button
        onClick={() => {
          setBookNowModal(true);
        }}
        className="xl:hidden"
        gradientMonochrome="cyan"
      >
        Book Now
      </Button>
      <div className="dates hidden flex-1 xl:flex items-center justify-center">
        <CustomDatePicker label={"Arrival Date"} />
        <CustomDatePicker label={"Departure Date"} />
        <div className="persons ml-3">
          <h1 className="text-sm text-white">Persons</h1>
          <Dropdown
            className="rounded-2xl text-nowrap"
            color="light"
            dismissOnClick={false}
            label="2 Adults + 3 Kids"
          >
            <Dropdown.Header>
              <span className="block text-lg">Guest for room</span>
            </Dropdown.Header>
            <div className="p-5">
              <div className="wrapper flex items-center justify-between">
                <h1>1 Adults</h1>
                <div className="wrapper0 flex items-center">
                  <Button gradientMonochrome="failure" size="xs">
                    -
                  </Button>
                  <Button
                    gradientMonochrome="success"
                    className="mx-2"
                    size="xs"
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="wrapper mt-5 flex items-center justify-between">
                <h1>1 Kids</h1>
                <div className="wrapper ml-20 flex items-center">
                  <Button gradientMonochrome="failure" size="xs">
                    -
                  </Button>
                  <Button
                    gradientMonochrome="success"
                    className="mx-2"
                    size="xs"
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="warpper flex items-center justify-center mt-6">
                <Button outline color="info">
                  Cancel
                </Button>

                <Button className="ml-5">Ok, Done</Button>
              </div>
            </div>
          </Dropdown>
        </div>
        <div className="voucher ml-2">
          <h1 className="text-sm text-white">Voucher</h1>
          <TextInput placeholder="Promo Code" />
        </div>
        <div className="wrapper ml-3">
          <h1 className="text-sm text-white">Availability</h1>

          <Button>Check Availability</Button>
        </div>
      </div>
      <div className="wrapper hidden xl:flex items-center justify-center px-16">
        <Button gradientMonochrome="info" className="mx-3 px-5">
          Login <CiLogin color="white" className="ml-2 h-5 w-5" />
        </Button>
      </div>
      <BottomDrawer
        red={true}
        open={bookNowModal}
        handleClose={() => setBookNowModal(false)}
      >
        <div className="container mx-auto min-h-[450px]">
          <h1 className="text-2xl font-bold text-center mt-5">
            Book Now at Sophie Red Hotel
          </h1>
          <div className="dates flex-col">
            <CustomDatePicker label={"Arrival Date"} />
            <CustomDatePicker label={"Departure Date"} />
            <div className="persons my-3">
              <h1 className="text-sm text-white">Persons</h1>
              <Dropdown
                className="rounded-2xl text-nowrap"
                color="light"
                dismissOnClick={false}
                label="2 Adults + 3 Kids"
              >
                <Dropdown.Header>
                  <span className="block text-lg">Guest for room</span>
                </Dropdown.Header>
                <div className="p-5">
                  <div className="wrapper flex items-center justify-between">
                    <h1>1 Adults</h1>
                    <div className="wrapper ml-20 flex items-center">
                      <Button gradientMonochrome="failure" size="xs">
                        -
                      </Button>
                      <Button
                        gradientMonochrome="success"
                        className="mx-2"
                        size="xs"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="wrapper mt-5 flex items-center justify-between">
                    <h1>1 Kids</h1>
                    <div className="wrapper ml-20 flex items-center">
                      <Button gradientMonochrome="failure" size="xs">
                        -
                      </Button>
                      <Button
                        gradientMonochrome="success"
                        className="mx-2"
                        size="xs"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="warpper flex items-center justify-center mt-6">
                    <Button outline color="info">
                      Cancel
                    </Button>

                    <Button className="ml-5">Ok, Done</Button>
                  </div>
                </div>
              </Dropdown>
            </div>
            <div className="voucher my-3">
              <h1 className="text-sm text-white">Voucher</h1>
              <TextInput placeholder="Promo Code" />
            </div>
            <div className="wrapper mb-5">
              <h1 className="text-sm text-white">Availability</h1>

              <Button className="w-full py-2">Check Availability</Button>
            </div>
          </div>
        </div>
      </BottomDrawer>
    </div>
  );
};

export default ClientHeader;
