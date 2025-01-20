import { Carousel, Button, TextInput, Label } from "flowbite-react";
import hotel1 from "../assets/hotels/hotel.jpg";
import hotel2 from "../assets/hotels/hotel2.webp";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import google from "../assets/google (1).png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import useAppContext from "../utils/zustand";
import useUserStore from "../utils/zustand";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const router = useNavigate();
  const { setCurrentAdmin } = useUserStore();
  const { login } = useAuth();

  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const user = await login(email, password);
    setCurrentAdmin(user);
    router("/dashboard");

    // Navigate to the dashboard
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    router("/");
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        background: "rgb(247,65,65)",
        background:
          "linear-gradient(43deg, rgba(247,65,65,1) 12%, rgba(225,240,247,1) 96%)",
      }}
    >
      <div className="container bg-white w-11/12 h-[90vh] rounded-lg shadow-lg overflow-hidden">
        <div className="flex h-full">
          {/* Left Side: Image Carousel */}
          <div className="hidden md:flex basis-6/12">
            <Carousel className="h-full">
              <img
                src={hotel1}
                alt="Hotel 1"
                className="object-cover h-full w-full"
              />
              <img
                src={hotel2}
                alt="Hotel 2"
                className="object-cover h-full w-full"
              />
            </Carousel>
          </div>

          {/* Right Side: Login Form */}
          <div className="basis-full md:basis-6/12 flex items-center justify-center p-10">
            <div className="w-full max-w-md">
              <img src={logo} alt="" />
              <h1 className="text-2xl font-bold text-center mb-6 mt-5">
                Welcome to Sophie Red Hotel
              </h1>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email} // Bind state
                    onChange={(e) => setEmail(e.target.value)} // Update state
                    required={true}
                  />
                </div>
                <div>
                  <Label htmlFor="password" value="Password" />
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password} // Bind state
                    onChange={(e) => setPassword(e.target.value)} // Update state
                    required={true}
                  />
                </div>
                <Button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent form submission refresh
                    handleSubmit();
                  }}
                  color="failure"
                  className="w-full py-2"
                >
                  Login
                </Button>
              </form>
              <Button
                onClick={handleGoogleLogin}
                color="white"
                className="w-full mt-3 shadow-sm py-2 border flex item-center justify-center"
              >
                <h1>Login With Google</h1>
                <img className="ml-3" width={20} src={google} alt="" />
              </Button>

              <p className="text-center mt-4 text-sm">
                Don't have an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
