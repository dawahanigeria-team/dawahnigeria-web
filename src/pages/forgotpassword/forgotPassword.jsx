import React, { useState } from "react";
import Logo from "../../assets/svg/close.svg";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/useAxios";
import { toast } from "react-hot-toast";
import Loader from "../../components/UI/loader/loader";
import ResetPassword from "./resetpassword/resetPassword";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [isreset, setreset] = useState(false);

  const handleSubmit = () => {
    if (email === ""|| email === undefined) {
      toast.error("Email is required");
      return;
    }
    setLoading(true);
    const payload = {
      verify_email: "true",
      email,
    };
    //post email for verfication
    axios
      .post(`/forgot_passwordApi.php`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-project": "206cf92c-8a46-45ef-bf3f-a6ef92fc6f25",
        },
      })
      .then((res) => {
        setLoading(false);
        setreset(true);
        console.log(res.data);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        
        toast.error('User with the provided email does not exist');
      });
  };

  return (
    <div className="w-full z-[100] h-full fixed bg-black inset-0">
      <div className="bg-[#353535] m-auto h-full inset-0 absolute w-full min-[615px]:w-[600px]">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="cursor-pointer w-full items-center justify-end flex"
        >
          <img src={Logo} alt="" />
        </div>
        <div
          className={
            isreset
              ? "hidden"
              : `w-full px-4 mt-[6rem] flex flex-col justify-center items-center text-sm min-[615px]:text-[16px]`
          }
        >
          <div className="w-full text-[#d4d4d4] mb-[4rem] items-start flex justify-start flex-col text-lg min-[615px]:text-2xl">
          <div>  Forgot Password</div>
          <div className="text-[12px]">Enter you email address to get a verification code</div>
          </div>
          <div className="w-full space-y-3">
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email address"
              className="w-full border border-[#d4d4d4] bg-[#353535] placeholder:text-[#5e5e5e] bg- px-6 rounded-[5px] outline-none h-[47px] text-sm min-[615px]:text-[16px] text-[#d4d4d4]"
            />

            <button
              onClick={handleSubmit}
              className="flex justify-center items-center h-[3.2rem] w-full rounded-[5px] text-[#070707] font-medium bg-[#d6ff00]"
            >
              {loading ? <Loader /> : <span> Submit</span>}
            </button>
          </div>
        </div>
        {isreset && <ResetPassword />}
      </div>
    </div>
  );
};

export default ForgotPassword;
