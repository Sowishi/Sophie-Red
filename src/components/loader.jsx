import Lottie from "react-lottie";
import loader from "../assets/lotties/loader.json";
import logo from "../assets/logo.png";
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={logo} width={250} alt="" />
      <Lottie
        style={{ width: 150 }}
        options={{
          animationData: loader,
          autoplay: true,
        }}
      />
    </div>
  );
};

export default Loader;
