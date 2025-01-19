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
import { AdminSidebar } from "./adminSidebar";

const Header = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const isCurrentPath = (path) => location.pathname === path;
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser } = useUserStore();

  return (
    <div className="header bg-slate-900 px-10 lg:px-20 p-5 flex items-center justify-between w-full">
      <AdminSidebar isOpen={isOpen} handleClose={() => setIsOpen(false)} />
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
          to="/dashboard"
          className={`flex px-5 cursor-pointer mx-2 py-3 rounded-lg justify-start items-center ${
            isCurrentPath("/dashboard") ? "bg-red-800" : "bg-slate-700"
          }`}
        >
          <HiHome color="white" className="mr-3" />
          <h1 className="text-sm font-extralight">Dashboard</h1>
        </Link>

        <Link
          to="/front-desk"
          className={`flex px-5 cursor-pointer mx-2 py-3 rounded-lg justify-start items-center ${
            isCurrentPath("/front-desk") ? "bg-red-800" : "bg-slate-700"
          }`}
        >
          <RiComputerLine color="white" className="mr-3" />
          <h1 className="text-sm font-extralight">Front Desk</h1>
        </Link>
        <Dropdown gradientMonochrome="failure" label="Services">
          <Dropdown.Header>
            <span className="block text-sm">Sophie Red Hotel</span>
          </Dropdown.Header>
          <Dropdown.Item onClick={() => navigation("/room")} icon={MdHotel}>
            Room Management
          </Dropdown.Item>
          <Dropdown.Item icon={MdOutlineCleaningServices}>
            Housekeeper Management
          </Dropdown.Item>
          <Dropdown.Item icon={HiUsers}>Users Management</Dropdown.Item>
        </Dropdown>
      </div>
      <div className="hidden lg:flex items-center justify-start cursor-pointer">
        <img
          src={"https://avatar.iran.liara.run/public/boy?username=Sowishi69"}
          style={{ width: 50 }}
          alt="User Avatar"
        />
        <div className="div text-white ml-5">
          <h1>Juan Dela Cruz</h1>
          <h1 className="font-extralight opacity-70">Front Desk</h1>
        </div>
        <FaAngleDown style={{ marginLeft: 10 }} color="white" size={25} />
      </div>
      <CiMenuBurger
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex lg:hidden"
        size={25}
        color="white"
      />
    </div>
  );
};

export default Header;
