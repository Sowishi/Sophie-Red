import ClientDashboardHeader from "../../components/clientDashboardHeader";

const ClientDashboardLayout = ({ children }) => {
  return (
    <div className="w-full bg-slate-900 h-screen">
      <ClientDashboardHeader />
      <div
        className="w-full h-full bg-white p-20"
        style={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
      >
        {children}
      </div>
    </div>
  );
};

export default ClientDashboardLayout;
