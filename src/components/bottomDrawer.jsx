"use client";

import { Button, Drawer } from "flowbite-react";
import { useState } from "react";

export function BottomDrawer({ open, handleClose, children, red }) {
  return (
    <>
      <Drawer
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          background: "rgb(247,65,65)",
          background:
            "linear-gradient(43deg, rgba(247,65,65,1) 12%, rgba(225,240,247,1) 96%)",
        }}
        open={open}
        onClose={handleClose}
        position="bottom"
      >
        {children}
      </Drawer>
    </>
  );
}
