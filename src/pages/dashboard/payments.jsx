import { Alert, Button } from "flowbite-react";
import DashboardLayout from "./dashboardLayout";
import { FaPlus } from "react-icons/fa";
import { PaymentsTable } from "../../components/paymentsTable";
import { CiWarning } from "react-icons/ci";

const Payments = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px] ">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="div p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">Payments</h1>
            <p className="mt-3 text-gray-500">
              You can manage and view the payments of user here
            </p>
          </div>
        </div>{" "}
        <Alert
          color="warning"
          className="flex flex-row items-center gap-2 mb-3"
        >
          <span>
            Always make sure to check the balance of the guest before checking
            them out.
          </span>
        </Alert>
        <PaymentsTable />
      </div>
    </DashboardLayout>
  );
};

export default Payments;
