import { Button, Dropdown, Navbar } from "flowbite-react";
import { motion } from "framer-motion";
import bg from "../assets/hotels/snapedit_1736691230278.jpeg";
import { Link, useNavigate } from "react-router-dom";
import Testimonials from "../components/testimonial";
import { ClientFooter } from "../components/clientFooter";
import useUserStore from "../utils/zustand";
import DisplayRoomsSelection from "../components/displayRoomsSelection";
import { useEffect, useState } from "react";
import useFetchCollection from "../hooks/useFetchCollection";
import DisplayRoomLanding from "../components/displayRoomLanding";

const Landing = () => {
  const navigation = useNavigate();
  const { currentUser, logout } = useUserStore();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { fetchCollection } = useFetchCollection();

  useEffect(() => {
    fetchCollection("rooms", setRooms, setLoading);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className=" min-h-screen"
    >
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(70, 0, 0, 0.3), rgba(70, 0, 0, 0.5)), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full h-screen bg-red-500 p-10"
      >
        <Navbar style={{ background: "transparent" }} fluid rounded>
          <Navbar.Brand as={Link} to="/">
            <h1 className="text-white text-2xl font-bold">
              Sophie <span className="text-red-500">Red Hotel</span>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link
              className="text-white text-lg opacity-80 hover:bg-red-500"
              href="#"
            >
              <span className="hover:text-red-500">Services</span>
            </Navbar.Link>
            <Navbar.Link
              className="text-white text-lg opacity-80 hover:bg-red-500"
              href="#"
            >
              About
            </Navbar.Link>
            <Navbar.Link
              className="text-white text-lg opacity-80 hover:bg-red-500"
              href="#"
            >
              Testimonials
            </Navbar.Link>
            {!currentUser && (
              <Button
                onClick={() => navigation("/login")}
                className="px-5"
                gradientMonochrome="info"
              >
                Login
              </Button>
            )}
          </Navbar.Collapse>

          {currentUser && (
            <div className="relative flex items-center justify-center">
              <p className="font-medium text-white mr-5 text-lg">
                {currentUser.name}
              </p>
              <Dropdown
                inline
                label={
                  <img
                    className="w-[50px] h-[50px] rounded-full cursor-pointer"
                    src={currentUser.photoURL}
                    alt="User Avatar"
                  />
                }
              >
                <Dropdown.Item>
                  <p className="font-medium">{currentUser.name}</p>
                </Dropdown.Item>
                <Dropdown.Item>
                  <p className="text-gray-500">{currentUser.email}</p>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Button
                    color="info"
                    className="w-full text-left"
                    onClick={() => navigation("/client-dashboard")}
                  >
                    Dashboard
                  </Button>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Button
                    color="failure"
                    className="w-full text-left"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </Dropdown.Item>
              </Dropdown>
            </div>
          )}
        </Navbar>

        <div className="content h-full flex justify-center items-center">
          <div className="wrapper flex justify-center items-center flex-col">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-white text-4xl md:text-7xl text-center"
            >
              Sophie Red Hotel <br /> &{" "}
              <span className="text-yellow-200">Onshore Restaurant</span>
            </motion.h1>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                onClick={() => {
                  if (currentUser) {
                    navigation("/booking");
                  } else {
                    navigation("/login");
                  }
                }}
                gradientMonochrome="info"
                className="mt-5 px-10 py-2"
              >
                <span className="text-sm font-bold">Book Now!</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-10 lg:p-20">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Sophie Room Hotels
          </h2>
          <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            "Book your stay at Sophie Red Hotel today and enjoy the best comfort
            at unbeatable prices!"
          </p>
        </div>
        <DisplayRoomLanding rooms={rooms} />
        <Testimonials />
      </div>

      <ClientFooter />
    </motion.div>
  );
};

export default Landing;
