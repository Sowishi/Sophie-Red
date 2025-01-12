import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import bg from "../../assets/hotels/snapedit_1736691230278.jpeg";
import bg2 from "../../assets/hotels/hotel2.webp";

import ClientHeader from "../../components/clientHeader";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import {
  HiOutlineViewList,
  HiOutlineLocationMarker,
  HiOutlineLightBulb,
  HiOutlineDocumentText,
  HiOutlineSparkles,
  HiOutlineTruck,
  HiOutlineClock,
  HiOutlineWifi,
  HiUser,
} from "react-icons/hi";
import Amenities from "../../components/amenities";
import Facilities from "../../components/facilities";
import ParkingAndLandmarks from "../../components/parkingAndLandmarks";
import { SophieAccord } from "../../components/sophieAccordition";
import Policies from "../../components/propertyPolicies";
import { ClientFooter } from "../../components/clientFooter";

const Booking = () => {
  const scrollToSection = (target) => {
    const section = document.getElementById(target);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Target section not found");
    }
  };

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const slideInFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  const slideInFromRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <>
      <div className="w-full min-h-screen">
        {/* Hero Section */}
        <motion.div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full h-screen relative"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <ClientHeader />
          <motion.div
            className="content absolute bottom-20 left-10 text-white md:w-[600px]"
            variants={slideInFromLeft}
            initial="hidden"
            animate="visible"
          >
            <h1 className="md:text-3xl font-bold mb-3">
              Welcome to Sophie Red Hotel
            </h1>
            <p className="mb-5 text-xs md:text-sm">
              Welcome to Sophie Red Hotel – where Filipino warmth meets
              world-class comfort. Nestled in the heart of the Philippines, we
              offer a perfect blend of modern luxury and local hospitality.
              Whether you're here for business or leisure, immerse yourself in a
              serene atmosphere, exceptional service, and a truly memorable
              stay.
            </p>
            <div className="social-icons flex space-x-4">
              <a
                href="https://www.facebook.com/SRHotelOfficialPage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500 transition"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500 transition"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-700 transition"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </motion.div>
          <div className="bg-[rgb(162,0,0)] w-full p-3 absolute bottom-0">
            <p className="text-white text-nowrap text-[5.5px]  lg:text-sm ">
              +639750479700 | MP7R+M68, Bobuntugan, Butuan - Cagayan de Oro -
              Iligan Rd, Bayan ng Jasaan, Lalawigan ng Misamis Oriental
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Booking;
