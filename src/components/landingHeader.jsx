import { Button, Dropdown, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";

const LandingHeader = ({
  currentAdmin,
  currentUser,
  setCurrentAdmin,
  navigation,
  logout,
}) => {
  return (
    <Navbar className="bg-white lg:bg-transparent" fluid rounded>
      <Navbar.Brand as={Link} to="/">
        <h1 className="text-black lg:text-white text-2xl font-bold">
          Sophie <span className="text-red-500">Red Hotel</span>
        </h1>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link
          className="text-black lg:text-white text-lg opacity-80 hover:bg-red-500"
          href="/"
        >
          <span className="hover:text-red-500">Home</span>
        </Navbar.Link>
        <Navbar.Link
          className="text-black lg:text-white text-lg opacity-80 hover:bg-red-500"
          href="#testimonials"
        >
          Testimonials
        </Navbar.Link>

        <Navbar.Link
          className="text-black lg:text-white text-lg opacity-80 hover:bg-red-500"
          href="#rooms"
        >
          Rooms
        </Navbar.Link>
        <Navbar.Link
          className="text-black lg:text-white text-lg opacity-80 hover:bg-red-500"
          href="#Amenities"
        >
          Amenities
        </Navbar.Link>
        {currentUser && (
          <div className="relative  flex items-center justify-center">
            <p className="font-medium text-black lg:text-white mr-5 text-lg">
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
                <p className="font-medium text-nowrap">
                  {currentUser.name || currentUser.fullName}
                </p>
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
                  onClick={() => {
                    logout();
                    localStorage.removeItem("user");
                  }}
                >
                  Logout
                </Button>
              </Dropdown.Item>
            </Dropdown>
          </div>
        )}

        {currentAdmin && (
          <div className="relative  flex items-center justify-center">
            <p className="font-medium text-black lg:text-white mr-5 text-lg">
              {currentAdmin.fullName}
            </p>

            <Dropdown
              inline
              label={
                <img
                  className="w-[50px] h-[50px] rounded-full cursor-pointer"
                  src={currentAdmin.photoURL}
                  alt="User Avatar"
                />
              }
            >
              <Dropdown.Item>
                <p className="font-medium text-nowrap">
                  {currentAdmin.name || currentAdmin.fullName}
                </p>
              </Dropdown.Item>
              <Dropdown.Item>
                <p className="text-gray-500">{currentAdmin.email}</p>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button
                  color="info"
                  className="w-full text-left"
                  onClick={() => navigation("/dashboard")}
                >
                  Dashboard
                </Button>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>
                <Button
                  color="failure"
                  className="w-full text-left"
                  onClick={() => {
                    setCurrentAdmin(null);
                    localStorage.removeItem("user");
                  }}
                >
                  Logout
                </Button>
              </Dropdown.Item>
            </Dropdown>
          </div>
        )}
        {!currentUser && !currentAdmin && (
          <Button
            onClick={() => navigation("/login")}
            className="px-5"
            gradientMonochrome="info"
          >
            Login
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LandingHeader;
