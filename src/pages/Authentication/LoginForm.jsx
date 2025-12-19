import React, { useState, useEffect } from "react";
import "./loginform.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail, MdLock } from "react-icons/md";
import GetGoogleOAuth from "./socials/googleauth";
import GetFacebookAuth from "./socials/facebookauth";
import { LoginAction } from "../../Redux/Actions/ActionCreators";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/loader/loader";
import { useDispatch } from "react-redux";
import { toast } from "../../utils/conditionalToast";
import HeadMeta from "../../components/head-meta";
import { FORGOTPASSWORD } from "../../utils/routes/constants";

const LoginForm = () => {
  const [show, setShow] = useState("password");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

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

    dispatch(LoginAction(payload, isSocial, navigate, setLoading));
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
        className={`loginform_form ${mounted ? 'form_mounted' : ''}`}
      >
        <div className="w-full form_content">
          {/* Welcome Text */}
          <div className="welcome_text">
            <h2 className="text-foreground">Welcome back</h2>
            <p className="text-color">Continue your journey with Dawah Nigeria</p>
          </div>

          {/* Email Input */}
          <div className={`input_group ${focusedField === 'email' ? 'focused' : ''} ${email ? 'has_value' : ''}`}>
            <div className="input_icon">
              <MdEmail />
            </div>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={email}
              id="email"
              className="loginform_name text-foreground"
            />
            <div className="input_border"></div>
          </div>

          {/* Password Input */}
          <div className={`input_group ${focusedField === 'password' ? 'focused' : ''} ${password ? 'has_value' : ''}`}>
            <div className="input_icon">
              <MdLock />
            </div>
            <div className="loginform_password_wrap">
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                type={show}
                placeholder="Password"
                name="password"
                required
                value={password}
                id="password"
                className="loginform_password text-foreground"
              />
              <button
                type="button"
                onClick={() => setShow(show === "password" ? "text" : "password")}
                className="password_toggle"
              >
                {show === "password" ? (
                  <AiFillEye className="text-color" />
                ) : (
                  <AiFillEyeInvisible className="text-color" />
                )}
              </button>
            </div>
            <div className="input_border"></div>
          </div>

          {/* Forgot Password */}
          <div className="loginform_forgot_wrap">
            <button
              type="button"
              onClick={() => {
                navigate(FORGOTPASSWORD);
              }}
              className="loginform_forgot"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button className="loginform_button" disabled={loading}>
            {loading ? (
              <Loader />
            ) : (
              <span className="button_content">
                <span>Log in</span>
                <svg className="button_arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="divider_wrapper">
          <div className="divider_line"></div>
          <span className="loginform_or text-color">or continue with</span>
          <div className="divider_line"></div>
        </div>

        {/* Social Login */}
        <div className="login_socials inset-x-0 w-full items-center mx-auto h-fit">
          <div className="hidden">
            <GetFacebookAuth data={data} setData={setData} />
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
