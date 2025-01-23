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
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../utils/zustand";

export function ClientSidebar({ isOpen, handleClose }) {
  const { logout } = useUserStore();
  const navigation = useNavigate();
  return (
    <>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Drawer" />
        <Sidebar className="bg-white" aria-label="Default sidebar example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiChartPie}>
                <Link to={"/client-dashboard"}>Dashboard</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={FaBed} labelColor="dark">
                <Link to={"/client-room"}>Room</Link>
              </Sidebar.Item>

              <Sidebar.Item
                onClick={() => {
                  logout();
                  navigation("/");
                }}
                icon={HiLogout}
              >
                Sign Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </Drawer>
    </>
  );
}
