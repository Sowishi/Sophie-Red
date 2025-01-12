import { Button } from "flowbite-react";
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
  HiOutlineOfficeBuilding,
  HiUser,
} from "react-icons/hi";
import {
  HiOutlineSparkles,
  HiOutlineTruck,
  HiOutlineClock,
  HiOutlineWifi,
} from "react-icons/hi";
import Amenities from "../../components/amenities";
import Facilities from "../../components/facilities";
import ParkingAndLandmarks from "../../components/parkingAndLandmarks";
import { SophieAccord } from "../../components/sophieAccordition";
import PropertyPolicies from "../../components/propertyPolicies";
import Policies from "../../components/propertyPolicies";
import { ClientFooter } from "../../components/clientFooter";

const Booking = () => {
  const scrollToSection = (target) => {
    // Get the element to scroll to
    const section = document.getElementById(target);

    if (section) {
      // Scroll to the element with smooth behavior
      section.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Target section not found");
    }
  };
  return (
    <>
      <div className="w-full min-h-screen">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${bg})`,
            backgroundSize: "cover", // Ensures the image covers the entire container
            backgroundPosition: "center", // Centers the image
          }}
          className="w-full bg-slate-950 h-screen relative "
        >
          <ClientHeader />
          <div className="content absolute bottom-20 left-10 text-white w-[600px]">
            <h1 className="text-3xl font-bold mb-3">
              Welcome to Sophie Red Hotel
            </h1>
            <p className="mb-5">
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
          </div>
          <div className="bg-[rgb(162,0,0)] w-full p-3 absolute bottom-0">
            <p className="text-white">
              cdo@sedahotels.com T +6388 323 8888 | +63 917 577 5886 C.M. Recto
              corner Corrales Avenue, Cagayan de Oro City 9000, Philippines
            </p>
          </div>
        </div>
        <div className="min-h-screen container mx-auto bg-white p-5">
          <div>
            <Button.Group>
              <Button onClick={() => scrollToSection("overview")} color="gray">
                <HiOutlineViewList className="mr-3 h-4 w-4" />
                Overview
              </Button>
              <Button onClick={() => scrollToSection("about")} color="gray">
                <HiOutlineLightBulb className="mr-3 h-4 w-4" />
                About
              </Button>

              <Button onClick={() => scrollToSection("location")} color="gray">
                <HiOutlineLocationMarker className="mr-3 h-4 w-4" />
                Location
              </Button>
              <Button onClick={() => scrollToSection("policies")} color="gray">
                <HiOutlineDocumentText className="mr-3 h-4 w-4" />
                Policies
              </Button>
            </Button.Group>
          </div>
          {/* Overview Content */}
          <div className="flex mt-10">
            <div className="basis-7/12">
              <div className="wrapper mt-5 mx-10">
                <h1 className="text-3xl font-semibold">
                  Sophie Red Hotel and Onshore Restaurant
                </h1>
                <p className="text-sm">
                  Butuan - Cagayan de Oro - Iligan Road, Jasaan, Jasaan,
                  Philippines, 9003 - See map
                </p>
                <hr className="mt-5 mb-3" />
                <p className="text-sm">
                  The car parking and the Wi-Fi are always free, so you can stay
                  in touch and come and go as you please. Conveniently situated
                  in the Jasaan part of Jasaan, this property puts you close to
                  attractions and interesting dining options. Rated with 4
                  stars, this high-quality property provides guests with access
                  to massage and outdoor pool on-site.
                </p>
              </div>
              {/* Highlights */}
              <div className="wrapper mt-5 mx-10 border p-5 shadow-sm rounded">
                <h1 className="font-semibold text-2xl">Highlights</h1>
                <div className="flex items-center justify-start mt-5">
                  <div className="flex items-center mb-3 flex-col justify-center mx-3">
                    <HiOutlineSparkles className="text-blue-500 mr-3 h-6 w-6" />
                    <span className="text-sm">Great for activities</span>
                  </div>
                  <div className="flex items-center mb-3 flex-col justify-center mx-3">
                    <HiOutlineTruck className="text-blue-500 mr-3 h-6 w-6" />
                    <span className="text-sm">Airport transfer</span>
                  </div>
                  <div className="flex items-center mb-3 flex-col justify-center mx-3">
                    <HiOutlineClock className="text-blue-500 mr-3 h-6 w-6" />
                    <span className="text-sm">Check-in [24-hour]</span>
                  </div>
                  <div className="flex items-center mb-3 flex-col justify-center mx-3">
                    <HiOutlineWifi className="text-blue-500 mr-3 h-6 w-6" />
                    <span className="text-sm">Free Wi-Fi in all rooms!</span>
                  </div>
                  <div className="flex items-center mb-3 flex-col justify-center mx-3">
                    <HiUser className="text-blue-500 mr-3 h-6 w-6" />
                    <span className="text-sm">Room service [24-hour]</span>
                  </div>
                </div>
              </div>
              {/* Amenities */}
              <Amenities />
              {/* Facilities */}
              <Facilities />
            </div>
            <div className="basis-5/12 flex flex-col items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.287762941997!2d124.73801817494206!3d8.664159191383336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffe45d368a3333%3A0xaae58833c816e934!2sSophie%20Red%20Hotel%20and%20Onshore%20Restaurant!5e0!3m2!1sen!2sph!4v1736693142618!5m2!1sen!2sph"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <hr />
              <ParkingAndLandmarks />
            </div>
          </div>

          {/* More About Sophie */}
          <div
            id="about"
            className="mx-10 mt-10 p-10 shadow-lg border rounded-lg"
          >
            <div className="wrapper w-full">
              <h1 className="text-3xl font-semibold mb-3">
                <span className="text-lg">More about </span>
                <br /> Sophie Red Hotel and Onshore Restaurant{" "}
              </h1>
              <img
                className="w-full h-[300px] object-center"
                src={bg2}
                alt=""
              />
            </div>
            <div className="content mt-5">
              <SophieAccord />
            </div>
            <div id="policies">
              <Policies />
            </div>
          </div>
        </div>

        {/* Maps */}
        <div id="location" className="w-full mt-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.287762941997!2d124.73801817494206!3d8.664159191383336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffe45d368a3333%3A0xaae58833c816e934!2sSophie%20Red%20Hotel%20and%20Onshore%20Restaurant!5e0!3m2!1sen!2sph!4v1736693142618!5m2!1sen!2sph"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="footer mt-20">
          <ClientFooter />
        </div>
      </div>
    </>
  );
};

export default Booking;
