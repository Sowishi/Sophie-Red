"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function CustomModal({
  children,
  open,
  handleClose,
  size,
  title,
  onSubmit,
  loading,
  hideFooter,
}) {
  return (
    <>
      <Modal size={size} show={open} onClose={handleClose}>
        <Modal.Header>
          {loading ? "Submitting, please wait..." : title}
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {!loading && !hideFooter && (
          <Modal.Footer>
            <Button className="w-full py-1" color="dark" onClick={handleClose}>
              <h1 className="text-lg font-bold">Cancel</h1>
            </Button>
            <Button
              className="w-full py-1"
              gradientMonochrome="failure"
              onClick={onSubmit}
            >
              <h1 className="text-lg font-bold">Confirm</h1>
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
