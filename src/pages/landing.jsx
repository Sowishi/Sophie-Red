import { Button, Navbar } from "flowbite-react";
import bg from "../assets/hotels/snapedit_1736691230278.jpeg";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)), url(${bg})`,
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
              className="text-white text-2xl opacity-80 hover:bg-red-500"
              href="#"
            >
              <span className="hover:text-red-500">Services</span>
            </Navbar.Link>
            <Navbar.Link
              className="text-white text-2xl opacity-80 hover:bg-red-500"
              href="#"
            >
              Pricing
            </Navbar.Link>
            <Navbar.Link
              className="text-white text-2xl opacity-80 hover:bg-red-500"
              href="#"
            >
              Contact
            </Navbar.Link>
            <Button className="px-5" gradientMonochrome="info">
              Login
            </Button>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Landing;
