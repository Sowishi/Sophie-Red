"use client";

import { Button, Drawer } from "flowbite-react";
import { useState } from "react";

export function BottomDrawer({ open, handleClose, children }) {
  return (
    <>
      <Drawer open={open} onClose={handleClose} position="bottom">
        {children}
      </Drawer>
    </>
  );
}
