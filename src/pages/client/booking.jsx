import bg from "../../assets/hotels/hotel2.webp";
import ClientHeader from "../../components/clientHeader";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Booking = () => {
  return (
    <>
      <div className="w-full min-h-screen">
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
            backgroundSize: "cover", // Ensures the image covers the entire container
            backgroundPosition: "center", // Centers the image
          }}
          className="w-full bg-slate-950 h-screen relative "
        >
          <ClientHeader />
          <div className="content absolute bottom-10 left-10 text-white w-[600px]">
            <h1 className="text-3xl font-bold mb-3">
              Welcome to Sophie Red Hotel
            </h1>
            <p className="mb-5">
              Welcome to Sophie Red Hotel – where Filipino warmth meets
              world-class comfort. Nestled in the heart of the Philippines, we
              offer a perfect blend of modern luxury and local hospitality.
              Whether you're here for business or leisure, immerse yourself in a
              serene atmosphere, exceptional service, and a truly memorable
              stay.
            </p>
            <div className="social-icons flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500 transition"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500 transition"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-700 transition"
              >
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
