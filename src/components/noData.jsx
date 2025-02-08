import Lottie from "react-lottie";
import nodata from "../assets/nodata.json";

const NoData = () => {
  return (
    <div className="container mx-auto h-[70vh] bg-white flex justify-center items-center flex-col">
      <div className="wrapper mb-10">
        <p className="text-red-500 text-3xl text-center">
          No active bookings found.
        </p>
        <Lottie
          style={{ width: 250 }}
          options={{
            animationData: nodata,
            autoplay: true,
          }}
        />
      </div>
    </div>
  );
};

export default NoData;
