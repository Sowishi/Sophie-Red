import { useState } from "react";
import DashboardLayout from "./dashboardLayout";
import { Button } from "flowbite-react";
import CustomModal from "../../components/customModal";
import CustomInput from "../../components/customInput";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import useCrudHousekeeping from "../../hooks/useCrudHousekeeping";
import HousekeeperListTable from "../../components/housekeeperListTable";

const HousekeeperList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [housekeeperId, setHousekeeperId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const { addHousekeeper } = useCrudHousekeeping();

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};

    if (!housekeeperId.trim()) {
      newErrors.housekeeperId = "Housekeeper ID is required";
    }
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleAddHousekeeper = async () => {
    // Validate the form before proceeding
    if (!validateForm()) {
      // Display specific toast messages for each error
      if (errors.housekeeperId) {
        toast.error(errors.housekeeperId);
      }
      if (errors.name) {
        toast.error(errors.name);
      }
      if (errors.email) {
        toast.error(errors.email);
      }
      return; // Stop if validation fails
    }

    // Log the data
    await addHousekeeper({
      housekeeperId,
      fullName: name,
      email,
    });

    toast.success("Housekeeper added successfully!");
    setIsModalOpen(false);

    // Clear the form fields
    setHousekeeperId("");
    setName("");
    setEmail("");
    setErrors({}); // Clear errors
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px]">
        <div className="flex mb-10 flex-col lg:flex-row justify-between items-center">
          <div className="p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">Housekeepers</h1>
            <p className="mt-3 text-gray-600 ">
              Below is the list of available housekeepers
            </p>
          </div>
          <Button
            gradientMonochrome="failure"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="mr-2" />
            Add Housekeeper
          </Button>
        </div>

        <HousekeeperListTable />

        {/* Modal for adding a housekeeper */}
        <CustomModal
          onSubmit={handleAddHousekeeper}
          open={isModalOpen}
          handleClose={() => {
            setIsModalOpen(false);
            setErrors({}); // Clear errors when modal is closed
          }}
          title="Add Housekeeper"
        >
          <div className="space-y-4">
            <CustomInput
              label="Housekeeper ID"
              placeholder="Enter housekeeper's unique ID"
              type="text"
              value={housekeeperId}
              onChange={(e) => setHousekeeperId(e.target.value)}
              error={errors.housekeeperId}
            />
            <CustomInput
              label="Name"
              placeholder="Enter housekeeper's name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />
            <CustomInput
              label="Email"
              placeholder="Enter housekeeper's email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
          </div>
        </CustomModal>
      </div>
    </DashboardLayout>
  );
};

export default HousekeeperList;
