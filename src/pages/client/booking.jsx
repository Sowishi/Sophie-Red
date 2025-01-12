import bg from "../../assets/hotels/hotel2.webp";
import { CustomDatePicker } from "../../components/datePicker";
import { Button, Dropdown, TextInput } from "flowbite-react";
import CustomInput from "../../components/customInput";
import { CiLogin } from "react-icons/ci";
import ClientHeader from "../../components/clientHeader";

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
        <ClientHeader />
      </div>
    </>
  );
};

export default Booking;
