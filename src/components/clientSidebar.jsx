"use client";

import { Button, Drawer, Sidebar, Modal } from "flowbite-react";
import { useState } from "react";
import { FaBed } from "react-icons/fa";
import { HiChartPie, HiLogout } from "react-icons/hi";
import { RiComputerLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../utils/zustand";

export function ClientSidebar({ isOpen, handleClose }) {
  const { logout } = useUserStore();
  const navigation = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="Menu" />
        <Sidebar className="bg-white" aria-label="Client Sidebar">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiChartPie}>
                <Link to={"/client-dashboard"}>Dashboard</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={FaBed} labelColor="dark">
                <Link to={"/booking"}>Book a Room</Link>
              </Sidebar.Item>
              <Sidebar.Item icon={RiComputerLine} labelColor="dark">
                <Link to={"/event-booking"}>Book an Event</Link>
              </Sidebar.Item>
              <Sidebar.Item
                icon={HiLogout}
                onClick={() => setLogoutModal(true)}
              >
                Sign Out
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </Drawer>

      {/* Logout Confirmation Modal */}
      <Modal show={logoutModal} onClose={() => setLogoutModal(false)}>
        <Modal.Header>Confirm Logout</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to log out?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setLogoutModal(false)} color="gray">
            Cancel
          </Button>
          <Button
            onClick={() => {
              logout();
              navigation("/");
            }}
            color="failure"
          >
            Log out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
