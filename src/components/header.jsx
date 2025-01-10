import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { HiHome, HiUsers, HiDocumentReport } from "react-icons/hi";
import { RiComputerLine } from "react-icons/ri";
import { MdHotel, MdOutlineCleaningServices } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";

const Header = () => {
  const location = useLocation();

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <div className="header bg-slate-900 px-20 p-5 flex items-center justify-between w-full">
      <div className="flex items-center justify-start">
        <img src={logo} style={{ width: 200 }} alt="Logo" />
        <h1 className="text-white ml-3 text-lg font-bold">Sophie Red Hotel</h1>
      </div>

      <div className="navigation flex-1 flex mx-10 text-white px-5">
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
        <Link
          to="/room"
          className={`flex px-5 cursor-pointer mx-2 py-3 rounded-lg justify-start items-center ${
            isCurrentPath("/room") ? "bg-red-800" : "bg-slate-700"
          }`}
        >
          <MdHotel color="white" className="mr-3" />
          <h1 className="text-sm font-extralight">Room</h1>
        </Link>
        <Link
          to="/housekeeping"
          className={`flex px-5 cursor-pointer mx-2 py-3 rounded-lg justify-start items-center ${
            isCurrentPath("/housekeeping") ? "bg-red-800" : "bg-slate-700"
          }`}
        >
          <MdOutlineCleaningServices color="white" className="mr-3" />
          <h1 className="text-sm font-extralight">Housekeeping</h1>
        </Link>
        <Link
          to="/users"
          className={`flex px-5 cursor-pointer mx-2 py-3 rounded-lg justify-start items-center ${
            isCurrentPath("/users") ? "bg-red-800" : "bg-slate-700"
          }`}
        >
          <HiUsers color="white" className="mr-3" />
          <h1 className="text-sm font-extralight">Users</h1>
        </Link>
        <Link
          to="/report"
          className={`flex px-5 cursor-pointer mx-2 py-3 rounded-lg justify-start items-center ${
            isCurrentPath("/report") ? "bg-red-800" : "bg-slate-700"
          }`}
        >
          <HiDocumentReport color="white" className="mr-3" />
          <h1 className="text-sm font-extralight">Report</h1>
        </Link>
      </div>

      <div className="flex items-center justify-start cursor-pointer">
        <img
          src={"https://avatar.iran.liara.run/public/boy?username=Sowishi69"}
          style={{ width: 50 }}
          alt="User Avatar"
        />
        <div className="div text-white ml-5">
          <h1>Jhon Michael Molina</h1>
          <h1 className="font-extralight opacity-70">
            jmmmolinathebest@gmail.com
          </h1>
        </div>
        <FaAngleDown style={{ marginLeft: 10 }} color="white" size={25} />
      </div>
    </div>
  );
};

export default Header;
