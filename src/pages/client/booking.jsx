import logo from "../../assets/logo.png";
import bg from "../../assets/hotels/hotel2.webp";
import { CustomDatePicker } from "../../components/datePicker";
import { Button, Dropdown, TextInput } from "flowbite-react";
import CustomInput from "../../components/customInput";
import { CiLogin } from "react-icons/ci";

const Booking = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
          backgroundSize: "cover", // Ensures the image covers the entire container
          backgroundPosition: "center", // Centers the image
        }}
        className="w-full bg-slate-950 h-screen"
      >
        <div
          style={{
            background: "rgb(247,65,65)",
            background:
              "linear-gradient(43deg, rgba(225,240,247,1) 1%, rgba(247,65,65,1) 45%)",
          }}
          className="header bg-white p-5 px-10 flex items-center justify-between"
        >
          <img className="w-[130px]" src={logo} alt="Logo" />
          <div className="dates flex-1 items-center flex justify-center border border-red-500">
            <CustomDatePicker label={"Arrival Date"} />
            <CustomDatePicker label={"Departure Date"} />
            <div className="persons">
              <h1 className="text-sm text-white">Persons</h1>
              <Dropdown
                className="rounded-2xl"
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
            <div className="voucher ml-2">
              <h1 className="text-sm text-white">Voucher</h1>
              <TextInput placeholder="Promo Code" />
            </div>
          </div>
          <div className="wrapper flex items-center justify-center px-16">
            <Button gradientMonochrome="info" className="mx-3 px-5">
              Login <CiLogin color="white" className="ml-2 h-5 w-5" />
            </Button>
            <Button className="px-5">Sign Up</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
