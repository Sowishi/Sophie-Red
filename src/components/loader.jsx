import Lottie from "react-lottie";
import loader from "../assets/lotties/loader.json";

const Loader = () => {
  return (
    <Lottie
      style={{ width: 150 }}
      options={{
        animationData: loader,
        autoplay: true,
      }}
    />
  );
};

export default Loader;
