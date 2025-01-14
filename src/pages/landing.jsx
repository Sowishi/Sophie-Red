import { Button, Dropdown, Navbar } from "flowbite-react";
import bg from "../assets/hotels/snapedit_1736691230278.jpeg";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Testimonials from "../components/testimonial";
import { ClientFooter } from "../components/clientFooter";
import useUserStore from "../utils/zustand";

const Landing = () => {
  const navigation = useNavigate();
  const { currentUser, logout } = useUserStore();

  return (
    <>
      <div className="w-full min-h-screen">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(70, 0, 0, 0.3), rgba(70, 0, 0, 0.5)), url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full h-screen bg-red-500 p-10"
        >
          <Navbar style={{ background: "transparent" }} fluid rounded>
            <Navbar.Brand as={Link} href="https://flowbite-react.com">
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
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <button className="w-full text-left" onClick={logout}>
                      Logout
                    </button>
                  </Dropdown.Item>
                </Dropdown>
              </div>
            )}
          </Navbar>
          <div className="content h-full flex justify-center items-center">
            <div className="wrapper flex justify-center items-center flex-col">
              <h1 className="text-white text-4xl md:text-7xl text-center">
                Sophie Red Hotel <br /> &{" "}
                <span className="text-yellow-200">Onshore Restaurant</span>
              </h1>

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
            </div>
          </div>
        </div>
        <Testimonials />
        <ClientFooter />
      </div>
    </>
  );
};

export default Landing;
