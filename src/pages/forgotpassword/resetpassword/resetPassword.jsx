import React, { useState } from "react";
import Loader from "../../../components/UI/loader/loader";
import { toast } from "../../../utils/conditionalToast"; // SSR-safe toast utility
import axios from "../../../utils/useAxios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [show, setShow] = useState("password");
  const [show2, setShow2] = useState("password");
  const navigate = useNavigate();

  const handleSubmit = () => {
    // //281190
    const validateData = {
      email,
      password,
      code,
    };
    for (let i in validateData) {
      if (validateData[i] === "") {
        toast.error(`${i} is required`);
        return;
      }
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (confirmPassword !== password) {
      toast.error("Same password is required");
      return;
    }

    setLoading(true);
    const payload = {
      update_forgot_password: "true",
      verification_code: code,
      email,
      password,
    };
    //post reset password request
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
        navigate("/auth/login");

        toast.success(res.data.message);
      })
      .catch((err) => {
        setLoading(false);

        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="w-full px-4 let swipeIn mt-[6rem] flex flex-col justify-center items-center text-sm min-[615px]:text-[16px]">
      <div className="w-full text-[#d4d4d4] mb-[4rem] items-start flex justify-start flex-col text-lg min-[615px]:text-2xl">
        <div> Reset Password</div>
        <div className="text-[12px]">
          Enter you verification code and set your new password
        </div>
      </div>

      <div className="w-full space-y-3">
        <input
          type="number"
          value={code}
          name="number"
          onChange={(e) => {
            setCode(e.target.value);
          }}
          placeholder="Verification Code"
          className="no-range w-full border border-[#d4d4d4] bg-[#353535]  bg- px-6 rounded-[5px] outline-none placeholder:text-[#5e5e5e] h-[47px] text-sm min-[615px]:text-[16px] text-[#d4d4d4]"
        />
        <input
          type="email"
          value={email}
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter your email address"
          className="w-full border border-[#d4d4d4] bg-[#353535] text-[#d4d4d4] bg- px-6 rounded-[5px] outline-none h-[47px] text-sm min-[615px]:text-[16px] placeholder:text-[#5e5e5e]"
        />
        <div className="flex items-center w-full border border-[#d4d4d4] bg-[#353535] px-6 rounded-[5px] h-[47px] text-sm min-[615px]:text-[16px] text-[#d4d4d4]">
          <input
            type={show}
            value={password}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter new password"
            className="h-full w-[90%] placeholder:text-[#5e5e5e] bg-[#353535]  outline-none text-[#d4d4d4]"
          />
          {show === "password" && (
            <div className="h-full w-[10%] flex items-center justify-center text-[20px] cursor-pointer text-[#d4d4d4]">
              <AiFillEye onClick={() => setShow("text")} className="" />
            </div>
          )}
          {show !== "password" && (
            <div className="h-full w-[10%] flex items-center justify-center text-[20px] cursor-pointer text-[#d4d4d4]">
              <AiFillEyeInvisible
                onClick={() => setShow("password")}
                className=""
              />
            </div>
          )}
        </div>

        <div className="flex items-center w-full border border-[#d4d4d4] bg-[#353535] px-6 rounded-[5px] h-[47px] text-sm min-[615px]:text-[16px] text-[#d4d4d4]">
          <input
            type={show}
            value={confirmPassword}
            name="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm Password"
            className="h-full w-[90%] placeholder:text-[#5e5e5e] bg-[#353535]  outline-none text-[#d4d4d4]"
          />
          {show2 === "password" && (
            <div className="h-full w-[10%] flex items-center justify-center text-[20px] cursor-pointer text-[#d4d4d4]">
              <AiFillEye onClick={() => setShow2("text")} className="" />
            </div>
          )}
          {show2 !== "password" && (
            <div className="h-full w-[10%] flex items-center justify-center text-[20px] cursor-pointer text-[#d4d4d4]">
              <AiFillEyeInvisible
                onClick={() => setShow2("password")}
                className=""
              />
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="flex justify-center items-center h-[3.2rem] w-full rounded-[5px] text-[#070707] font-medium bg-[#d6ff00]"
        >
          {loading ? <Loader /> : <span> Reset Password</span>}
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
