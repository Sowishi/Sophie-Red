"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export function CustomModal({
  children,
  open,
  handleClose,
  size,
  title,
  onSubmit,
}) {
  return (
    <>
      <Modal size={size} dismissible show={open} onClose={handleClose}>
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button
            className="w-full py-3"
            gradientMonochrome="failure"
            onClick={onSubmit}
          >
            <h1 className="text-2xl font-bold">Confirm</h1>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
