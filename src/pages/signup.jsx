import { Carousel, Button, TextInput, Label } from "flowbite-react";
import hotel1 from "../assets/hotels/hotel.jpg";
import hotel2 from "../assets/hotels/hotel2.webp";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import google from "../assets/google (1).png";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useUserStore from "../utils/zustand";
import { useState } from "react";
import { toast } from "react-toastify";
import useCrudUsers from "../hooks/useCrudUsers";

const SignUp = () => {
  const router = useNavigate();
  const { setCurrentUser } = useUserStore();
  const { addUser } = useCrudUsers();

  // State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const data = { fullName, email, password };
      await addUser({ ...data, role: "user" });
      toast.success("Successfully Sign up");
      router("/login");
    } catch (error) {
      toast.error(error.message);
    }
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

          {/* Right Side: Sign Up Form */}
          <div className="basis-full md:basis-6/12 flex items-center justify-center p-10">
            <div className="w-full max-w-md">
              <img src={logo} alt="" />
              <h1 className="text-2xl font-bold text-center mb-6 mt-5">
                Create Your Account
              </h1>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="fullName" value="Full Name" />
                  <TextInput
                    id="fullName"
                    type="fullName"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" value="Email" />
                  <TextInput
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" value="Password" />
                  <TextInput
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" value="Confirm Password" />
                  <TextInput
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                  color="failure"
                  className="w-full py-2"
                >
                  Sign Up
                </Button>
              </form>

              <p className="text-center mt-4 text-lg">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
