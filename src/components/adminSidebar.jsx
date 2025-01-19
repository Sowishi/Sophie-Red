"use client";

import { Button, Drawer, Dropdown, Sidebar } from "flowbite-react";
import { useState } from "react";
import { FaBed } from "react-icons/fa";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiLogout,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiUsers,
  HiViewBoards,
} from "react-icons/hi";
import { MdOutlineCleaningServices } from "react-icons/md";
import { RiComputerLine } from "react-icons/ri";

export function AdminSidebar({ isOpen, handleClose }) {
  return (
    <>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Drawer" />
        <Sidebar className="bg-white" aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="/client-dashboard" icon={HiChartPie}>
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="/client-room" icon={FaBed} labelColor="dark">
                Room
              </Sidebar.Item>
              <Sidebar.Item href="client-accomodation" icon={RiComputerLine}>
                Accomodation
              </Sidebar.Item>

              <Dropdown gradientMonochrome="failure" label="Services">
                <Dropdown.Header>
                  <span className="block text-sm">Sophie Red Hotel</span>
                </Dropdown.Header>
                <Dropdown.Item onClick={() => navigation("/room")} icon={FaBed}>
                  Room Management
                </Dropdown.Item>
                <Dropdown.Item icon={MdOutlineCleaningServices}>
                  Housekeeper Management
                </Dropdown.Item>
                <Dropdown.Item icon={HiUsers}>Users Management</Dropdown.Item>
              </Dropdown>

              <Sidebar.Item href="#" icon={HiLogout}>
                Sign Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </Drawer>
    </>
  );
}
