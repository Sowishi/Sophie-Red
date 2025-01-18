import useUserStore from "../../utils/zustand";
import ClientDashboardLayout from "./_layout";

const ClientDashboard = () => {
  const { currentUser } = useUserStore();

  return (
    <ClientDashboardLayout>
      <div className="flex flex-col items-start justify-start mb-3">
        <h1 className="text-3xl font-bold">Good Day, {currentUser?.name}</h1>
        <p className="text-sm  opacity-70">
          This is the location of Sophie Red Hotel
        </p>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.287762941997!2d124.73801817494206!3d8.664159191383336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32ffe45d368a3333%3A0xaae58833c816e934!2sSophie%20Red%20Hotel%20and%20Onshore%20Restaurant!5e0!3m2!1sen!2sph!4v1736693142618!5m2!1sen!2sph"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </ClientDashboardLayout>
  );
};

export default ClientDashboard;
