"use client";

import { Button, Drawer, Sidebar } from "flowbite-react";
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
  HiViewBoards,
} from "react-icons/hi";
import { RiComputerLine } from "react-icons/ri";

export function ClientSidebar({ isOpen, handleClose }) {
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
