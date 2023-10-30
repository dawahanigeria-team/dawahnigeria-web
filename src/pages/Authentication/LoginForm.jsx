import React, { useState } from "react";
import "./loginform.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
//import facebook from "../../assets/png/social/facebook.png";
import twitter from "../../assets/png/social/twitter.png";
//import google from "../../assets/png/social/google.png";
import GetGoogleOAuth from "./socials/googleauth";
import GetFacebookAuth from "./socials/facebookauth";
import { LoginAction } from "../../Redux/Actions/ActionCreators";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/loader/loader";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import HeadMeta from "../../components/head-meta";
const LoginForm = () => {
  const [show, setShow] = useState("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;

    const validateData = {
      email,
      password,
    };

    for (let i in validateData) {
      if (validateData[i] === "") {
        toast.error(`${i} cannot be empty`);
        return;
      }
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");

      return;
    }

    const payload = {
      action: "login_user",
      email_or_username: email,
      password: password,
    };
    const isSocial = false;
    //console.log(payload);
    dispatch(LoginAction(payload, isSocial, navigate, setLoading));

    //toast.success("Login successful");
  };

  const { email, password } = data;
  return (
    <div className="loginform_wrapper">
      <HeadMeta title="Sign in to Dawah Nigeria | Home of Islamic resources" />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        style={{ height: `${Math.floor(0.7 * window.innerHeight)}px` }}
        className="loginform_form"
      >
        <div className="w-full">
          <input
            onChange={(e) => {
              handleInput(e);
            }}
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={email}
            id="email"
            className="loginform_name text-foreground "
          />
          <div className="loginform_password_wrap ">
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              type={show}
              placeholder="Password"
              name="password"
              required
              value={password}
              id="password"
              className="loginform_password text-foreground "
            />
            {show === "password" && (
              <div className="loginform_password_icon_show_wrap">
                <AiFillEye
                  onClick={() => setShow("text")}
                  className="loginform_password_icon_show text-color"
                />
              </div>
            )}
            {show !== "password" && (
              <div className="loginform_password_icon_hide_wrap ">
                <AiFillEyeInvisible
                  onClick={() => setShow("password")}
                  className="loginform_password_icon_hide text-color"
                />
              </div>
            )}
          </div>
          <div className="loginform_forgot_wrap">
            <p
              onClick={() => {
                navigate("/forgot-password");
              }}
              className="loginform_forgot"
            >
              Forgot password?
            </p>
          </div>
          <button className="loginform_button">
            {" "}
            {loading ? <Loader /> : <span>Log in</span>}
          </button>
        </div>

        <span className="loginform_or text-color">- or -</span>

        <div className=" login_socials inset-x-0 w-full items-center mx-auto h-fit">
          <div className="hidden">
            <GetFacebookAuth data={data} setData={setData} />
          </div>

          <div
            onClick={() => {
              toast.error("Feature not yet availabe");
            }}
            className="hidden w-[45px] h-[45px]"
          >
            <img className="w-full h-full" src={twitter} alt="twitter" />
          </div>

          <div className="z-[1] w-full">
            <GetGoogleOAuth data={data} setData={setData} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
