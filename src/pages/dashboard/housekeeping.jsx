import DashboardLayout from "./dashboardLayout";

import { HousekeepingTable } from "../../components/housekeepingTable";

const Housekeeping = () => {
  return (
    <DashboardLayout>
      {/* Header */}

      <div className="container mx-auto lg:p-10 rounded-3xl min-h-[600px]">
        <div className="flex mb-10 flex-col lg:flex-row justify-between items-center">
          <div className="div p-5">
            <h1 className="text-2xl lg:text-4xl font-bold">
              Housekeeping Room Management
            </h1>
            <p className="mt-3 text-gray-500">
              You can effortlessly manage all rooms and access their individual
              logs right here.
            </p>
          </div>
        </div>

        <HousekeepingTable />
      </div>
    </DashboardLayout>
  );
};

export default Housekeeping;
