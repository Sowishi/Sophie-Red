import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import { HiHome, HiUsers, HiDocumentReport } from "react-icons/hi";
import { RiComputerLine } from "react-icons/ri";
import { MdHotel, MdOutlineCleaningServices } from "react-icons/md";
import { FaAngleDown, FaBed } from "react-icons/fa";
import { Button, Dropdown } from "flowbite-react";
import useUserStore from "../utils/zustand";
import { CiMenuBurger } from "react-icons/ci";
import { ClientSidebar } from "./clientSidebar";
import CustomModal from "./customModal";
import Profile from "../pages/profile";

const ClientDashboardHeader = () => {
  const location = useLocation();
  const navigation = useNavigate();
  const [profileModal, setProfileModal] = useState(false);

  const isCurrentPath = (path) => location.pathname === path;
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser, logout } = useUserStore();

  return (
    <div className="header bg-slate-900 px-10 lg:px-20 p-5 flex items-center justify-between w-full">
      <ClientSidebar isOpen={isOpen} handleClose={() => setIsOpen(false)} />
      <div
        onClick={() => navigation("/")}
        className="flex items-center justify-start cursor-pointer"
      >
        <img src={logo} style={{ width: 50 }} alt="Logo" />
        <h1 className="text-white ml-3 text-sm font-medium text-nowrap italic">
          Sophie Red Hotel
        </h1>
      </div>
      <div className="navigation hidden lg:flex flex-1  mx-10 text-white px-5">
        <Link
          to="/"
          className={`flex px-5 cursor-pointer mx-2 py-3 rounded-lg justify-start items-center ${
            isCurrentPath("/") ? "bg-red-800" : "bg-slate-700"
          }`}
        >
          <HiHome color="white" className="mr-3" />
          <h1 className="text-sm font-extralight">Landing</h1>
        </Link>
        <Link
          to="/client-dashboard"
          className={`flex px-5 cursor-pointer mx-2 py-3 rounded-lg justify-start items-center ${
            isCurrentPath("/client-dashboard") ? "bg-red-800" : "bg-slate-700"
          }`}
        >
          <HiHome color="white" className="mr-3" />
          <h1 className="text-sm font-extralight">Dashboard</h1>
        </Link>
        <Link
          to="/client-room"
          className={`flex px-5 cursor-pointer mx-2 py-3 rounded-lg justify-start items-center ${
            isCurrentPath("/client-room") ? "bg-red-800" : "bg-slate-700"
          }`}
        >
          <FaBed color="white" className="mr-3" />
          <h1 className="text-sm font-extralight">Room</h1>
        </Link>
      </div>
      <div className="hidden lg:flex items-center justify-start cursor-pointer">
        <img
          src={currentUser?.photoURL}
          style={{ width: 50 }}
          alt="User Avatar"
        />
        <div className="div text-white mx-5">
          <h1>{currentUser?.name}</h1>
          <h1 className="font-extralight opacity-70">{currentUser?.email}</h1>
        </div>
        <Dropdown gradientMonochrome="failure">
          <Dropdown.Header>
            <span className="block text-sm">{currentUser?.fullName}</span>
            <span className="block truncate text-sm font-medium">
              {currentUser?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item
            className="w-full"
            onClick={() => {
              setProfileModal(true);
            }}
          >
            <Button className="w-full">Manage Profile</Button>
          </Dropdown.Item>
          <Dropdown.Item>
            <Button
              onClick={() => {
                navigation("/");
                logout();
              }}
              className="w-full"
              color="failure"
            >
              Log out
            </Button>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <CiMenuBurger
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex lg:hidden"
        size={25}
        color="white"
      />

      <CustomModal
        hideFooter={true}
        size={"3xl"}
        title={"Manage Profile"}
        open={profileModal}
        handleClose={() => setProfileModal(false)}
      >
        <Profile />
      </CustomModal>
    </div>
  );
};

export default ClientDashboardHeader;
