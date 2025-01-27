import { Button, Dropdown, Navbar } from "flowbite-react";
import { motion } from "framer-motion";
import bg from "../assets/hotels/snapedit_1736691230278.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { ClientFooter } from "../components/clientFooter";
import useUserStore from "../utils/zustand";

const Terms = () => {
  const navigation = useNavigate();
  const { currentUser, logout } = useUserStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen"
    >
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(70, 0, 0, 0.3), rgba(70, 0, 0, 0.5)), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full min-h-screen bg-red-500 p-10"
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
              href="/"
            >
              <span className="hover:text-red-500">Home</span>
            </Navbar.Link>
            <Navbar.Link
              className="text-white text-lg opacity-80 hover:bg-red-500"
              href="#testimonials"
            >
              Testimonials
            </Navbar.Link>
            <Navbar.Link
              className="text-white text-lg opacity-80 hover:bg-red-500"
              href="#rooms"
            >
              Rooms
            </Navbar.Link>
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
                      onClick={logout}
                    >
                      Logout
                    </Button>
                  </Dropdown.Item>
                </Dropdown>
              </div>
            )}
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
        </Navbar>
        <div className="p-6 max-w-3xl mx-auto text-gray-200 bg-gray-900 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Terms and Conditions
          </h1>
          <p className="mb-4">Effective Date: [Insert Date]</p>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing and using the services of Sophie Red Hotel, you agree
            to comply with these Terms and Conditions.
          </p>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            2. Reservations & Payments
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>All bookings are subject to availability.</li>
            <li>
              Full payment or a deposit may be required at the time of booking.
            </li>
            <li>Cancellation policies apply and may incur charges.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            3. Guest Responsibilities
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Guests must comply with all hotel policies and regulations.</li>
            <li>Any damages caused by guests will be charged accordingly.</li>
            <li>
              No smoking, illegal activities, or disruptive behavior is allowed.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            4. Privacy & Data Protection
          </h2>
          <p className="mb-4">
            We handle your personal data with care as outlined in our Privacy
            Policy.
          </p>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            5. Liability Disclaimer
          </h2>
          <p className="mb-4">
            Sophie Red Hotel is not liable for loss, theft, or damages to
            personal belongings during your stay.
          </p>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            6. Amendments
          </h2>
          <p className="mb-4">
            We reserve the right to update these Terms and Conditions at any
            time. Continued use of our services constitutes acceptance of the
            changes.
          </p>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            7. Contact Us
          </h2>
          <p className="mb-4">
            For any inquiries regarding these Terms and Conditions, please
            contact us at:
          </p>
          <p className="font-semibold">Sophie Red Hotel</p>
          <p>Email: support@sophieredhotel.com</p>
          <p>Phone: +[Insert Phone Number]</p>
        </div>
      </div>
      <ClientFooter />
    </motion.div>
  );
};

export default Terms;
