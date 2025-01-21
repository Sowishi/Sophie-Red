import { HiOutlineArrowRight } from "react-icons/hi";
import DashboardLayout from "./dashboardLayout";
import { Button } from "flowbite-react";
import { UsersTable } from "../../components/usersTable";
import { useState } from "react";
import CustomModal from "../../components/customModal";
import CustomInput from "../../components/customInput";
import { CustomSelect } from "../../components/customSelect";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Lottie from "react-lottie";
import loader from "../../assets/lotties/loader.json";
import useCrudUsers from "../../hooks/useCrudUsers";

const UsersManagement = () => {
  const [addUserModal, setAddUserModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addUser } = useCrudUsers();

  const [forms, setForms] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setForms({ ...forms, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const isFormValid = Object.values(forms).every(
      (field) => field.trim() !== ""
    );

    if (!isFormValid) {
      toast.error(
        "All fields are required. Please fill out the form completely."
      );
      setLoading(false);
      return;
    }

    try {
      addUser(forms);
      setTimeout(() => {
        setLoading(false);
        setAddUserModal(false);
        toast.success("User successfully added.");
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
          <div className="p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">Users Management</h1>
            <p className="mt-3 text-gray-500">
              Manage user accounts in this section.
            </p>
          </div>
          <Button
            onClick={() => setAddUserModal(true)}
            style={{ padding: 10 }}
            gradientMonochrome="failure"
          >
            Add User
            <FaPlus className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <UsersTable />
      </div>

      {/* Modals */}
      <CustomModal
        title={"Add User"}
        size={"5xl"}
        open={addUserModal}
        handleClose={() => setAddUserModal(false)}
        onSubmit={handleSubmit}
        loading={loading}
      >
        {!loading && (
          <div className="container">
            <CustomInput
              label={"Full Name"}
              value={forms.fullName}
              onChange={handleChange}
              name={"fullName"}
              placeholder={"Enter full name"}
            />
            <CustomInput
              label={"Email"}
              value={forms.email}
              onChange={handleChange}
              name={"email"}
              type={"email"}
              placeholder={"Enter email"}
            />
            <CustomInput
              label={"Password"}
              value={forms.password}
              onChange={handleChange}
              name={"password"}
              type={"password"}
              placeholder={"Enter password"}
            />
            <CustomSelect
              value={forms.role}
              data={[
                "Select Role",
                "Admin",
                "Front Desk",
                "Super Admin",
                "Housekeeping",
              ]}
              label={"Role"}
              name={"role"}
              onChange={handleChange}
            />
          </div>
        )}

        {loading && (
          <div className="container">
            <Lottie
              style={{ width: 150 }}
              options={{
                animationData: loader,
                autoplay: true,
              }}
            />
          </div>
        )}
      </CustomModal>
    </DashboardLayout>
  );
};

export default UsersManagement;
