import { Badge, Button, Label } from "flowbite-react";
import useUserStore from "../utils/zustand";
import CustomInput from "../components/customInput";
import google from "../assets/google (1).png";

const Profile = () => {
  const { currentUser } = useUserStore();
  console.log(currentUser);
  return (
    <>
      <div className="container mx-auto p-5 lg:p-10">
        <div className="flex jsutify-center items-center">
          <img
            className="w-[100px] h-[100px] rounded-full"
            src={currentUser.photoURL}
            alt=""
          />
          <div className="wrapper flex flex-col ml-5 ">
            <h1 className="text-3xl font-bold">{currentUser?.name}</h1>
            <Badge color="warning" className="mt-2">
              <p className="text-sm">
                {currentUser?.role ? currentUser?.role : "Guest / Customer"}
              </p>
            </Badge>
          </div>
        </div>
        <hr className="my-5" />
        <div className="content ">
          <CustomInput label={"Name"} value={currentUser?.name} />
          <CustomInput label={"Email"} value={currentUser?.email} />
          <CustomInput label={"UID"} value={currentUser?.uid} />

          <CustomInput label={"Login with"} value={"Google"} />
        </div>
      </div>
    </>
  );
};

export default Profile;
