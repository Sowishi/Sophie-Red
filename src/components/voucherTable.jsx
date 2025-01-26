"use client";

import { Badge, Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import loader from "../assets/lotties/loader.json";
import useCrudVoucher from "../hooks/useCrudVoucher";
import useFetchCollection from "../hooks/useFetchCollection";
import { toast } from "react-toastify";
import moment from "moment";
import Loader from "./loader";
import { ConfirmModal } from "./confirmModal";

export function VoucherTable({ openModal, handleCloseModal }) {
  const { addVoucher, deleteVoucher } = useCrudVoucher();
  const { fetchCollection } = useFetchCollection();
  const [loading, setLoading] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState();
  const [deleteModal, setDeleteModal] = useState(false);
  const [voucherData, setVoucherData] = useState({
    name: "",
    code: "",
    discount: "",
  });
  const [vouchers, setVouchers] = useState([]);

  // Handles input field changes
  const handleChange = (e) =>
    setVoucherData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Fetch vouchers on component mount
  useEffect(() => {
    fetchCollection("vouchers", setVouchers, setLoading);
  }, []);

  // Handles voucher submission
  const handleSubmit = async () => {
    try {
      await addVoucher(voucherData);
      toast.success("Successfully Created Voucher");
      handleCloseModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handles voucher deletion (console logs the ID for now)
  const handleDelete = (id) => {
    setSelectedVoucher(id);
    setDeleteModal(true);
  };

  // Loading state UI
  if (loading) {
    return (
      <div className="flex h-full justify-center items-center flex-col pt-28">
        <Loader />
      </div>
    );
  }

  const handleDeleteVoucher = async () => {
    try {
      await deleteVoucher(selectedVoucher);
      toast.success("Deleted Successfully");
      setDeleteModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Table Row for vouchers
  const renderVoucherRow = (voucher) => (
    <Table.Row key={voucher.id}>
      <Table.Cell>{voucher.name}</Table.Cell>
      <Table.Cell>{voucher.code}</Table.Cell>
      <Table.Cell>{voucher.discount}%</Table.Cell>
      <Table.Cell>
        {voucher.createdAt
          ? moment(voucher.createdAt.toDate()).format("LLL")
          : "Invalid"}
      </Table.Cell>
      <Table.Cell>
        <Button color="failure" onClick={() => handleDelete(voucher.id)}>
          Delete
        </Button>
      </Table.Cell>
    </Table.Row>
  );

  return (
    <div className="p-4 overflow-x-auto">
      {/* Voucher Table */}
      <Table hoverable striped className="mt-4">
        <Table.Head>
          <Table.HeadCell>Voucher Name</Table.HeadCell>
          <Table.HeadCell>Voucher Code</Table.HeadCell>
          <Table.HeadCell>Discount Percentage</Table.HeadCell>
          <Table.HeadCell>Created At</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {vouchers.map(renderVoucherRow)}
        </Table.Body>
      </Table>

      {/* Create Voucher Modal */}
      <Modal show={openModal} onClose={handleCloseModal}>
        <Modal.Header>Create a New Voucher</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            {["name", "code", "discount"].map((field) => (
              <div key={field}>
                <Label htmlFor={field}>
                  {field === "discount"
                    ? "Discount Percentage"
                    : `Voucher ${
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }`}
                </Label>
                <TextInput
                  id={field}
                  name={field}
                  type={field === "discount" ? "number" : "text"}
                  placeholder={`Enter ${
                    field === "discount" ? "discount %" : `voucher ${field}`
                  }`}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end">
          <Button color="gray" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button gradientMonochrome="failure" onClick={handleSubmit}>
            Create Voucher
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmModal
        handleSubmit={handleDeleteVoucher}
        title={"Are you sure you want to delete this voucher?"}
        open={deleteModal}
        handleClose={() => setDeleteModal(false)}
      />
    </div>
  );
}
