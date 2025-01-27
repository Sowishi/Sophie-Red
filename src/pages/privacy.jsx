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
import eventBg from "../assets/event.jpg";

const Privacy = () => {
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
            Privacy Policy
          </h1>
          <p className="mb-4">Effective Date: [Insert Date]</p>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            1. Introduction
          </h2>
          <p className="mb-4">
            Welcome to Sophie Red Hotel. Your privacy is important to us. This
            Privacy Policy explains how we collect, use, and protect your
            personal information.
          </p>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            2. Information We Collect
          </h2>
          <p className="mb-2">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Personal information (name, email, phone number, address)</li>
            <li>Payment and billing details</li>
            <li>Check-in and check-out details</li>
            <li>Device and browsing information</li>
          </ul>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            3. How We Use Your Information
          </h2>
          <p className="mb-2">We use the collected data to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Process bookings and payments</li>
            <li>Improve our services and customer experience</li>
            <li>Ensure security and fraud prevention</li>
            <li>Send promotional offers and updates (if opted in)</li>
          </ul>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            4. Data Protection & Security
          </h2>
          <p className="mb-4">
            We implement strict security measures to protect your personal data
            from unauthorized access, disclosure, or loss.
          </p>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            5. Sharing of Information
          </h2>
          <p className="mb-4">
            We do not sell or rent your information. However, we may share data
            with trusted service providers for hotel operations and legal
            purposes.
          </p>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            6. Your Rights & Choices
          </h2>
          <p className="mb-4">
            You have the right to access, update, or delete your personal
            information. You may also opt out of marketing communications at any
            time.
          </p>

          <h2 className="text-2xl font-semibold text-red-400 mb-2">
            7. Contact Us
          </h2>
          <p className="mb-4">
            For any questions regarding this Privacy Policy, please contact us
            at:
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

export default Privacy;
