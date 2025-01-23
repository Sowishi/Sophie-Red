import { useState } from "react";
import ClientDashboardHeader from "../../components/clientDashboardHeader";
import { ClientSidebar } from "../../components/clientSidebar";

const ClientDashboardLayout = ({ children }) => {
  return (
    <div className="w-full bg-slate-900 h-screen">
      <ClientDashboardHeader />
      <div
        className="bg-[#F9F9F9] p-5 py-10 lg:p-20"
        style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
      >
        {children}
      </div>
    </div>
  );
};

export default ClientDashboardLayout;
