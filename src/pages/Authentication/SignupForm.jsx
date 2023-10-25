import React, { useState, useEffect } from "react";
import "./signupform.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
//import facebook from "../../assets/png/social/facebook.png";
import twitter from "../../assets/png/social/twitter.png";
//import google from "../../assets/png/social/google.png";

import GetGoogleOAuth from "./socials/googleauth";
import GetFacebookAuth from "./socials/facebookauth";
import { toast } from "react-hot-toast";
import axios from "../../utils/useAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/loader/loader";
import { registration } from "../../Redux/Actions/ActionCreators";
import HeadMeta from "../../components/head-meta";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState("password");
  const [show2, setShow2] = useState("password");
  const [isdrop, setisdrop] = useState(false);
  const [langData, setLangData] = useState();
  const [terms, setTerms] = useState(0);
  const [loading, setLoading] = useState(false);
  const [langid, setlangid] = useState("");
  const [lang, setLang] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const isSocial = false;
  useEffect(() => {
    axios
      .get(`/all_lang_api.php`)
      .then((res) => {
        ////console.log(res.data)
        setLangData(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  const handleInput = (e) => {
    e.preventDefault();
    const newData = { ...data };

    newData[e.target.id] = e.target.value;

    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name, confirm_password } = data;
    const validateData = {
      name,
      email,
      password,
      language: langid,
    };

    //console.log(validateData);
    for (let i in validateData) {
      if (validateData[i] === "") {
        toast.error(`${i} cannot be empty`);
        return;
      }
    }

    if (password.length < 6 || confirm_password.length < 6) {
      toast.error("Password must be at least 6 characters");

      return;
    }
    if (confirm_password !== password) {
      toast.error("Same password is required");
      return;
    }

    const payload = {
      action: "register_user",
      username: name,
      email: email,
      password: password,
      languageId: langid,
    };

    const getId = {
      action: "login_user",
      email_or_username: email,
      password: password,
    };

    //console.log(payload)
    dispatch(registration(payload, isSocial, getId, navigate, setLoading));
    //toast.success("Signup successful");
  };

  const { email, password, name, confirm_password } = data;

  //console.log(data);
  return (
    <div className="signupform_wrapper">
      <HeadMeta title="Sign up on Dawah Nigeria | Home of Islamic resources" />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        style={{ height: `${Math.floor(0.7 * window.innerHeight)}px` }}
        className="signupform_form"
      >
        <div className="w-full">
          <input
            onChange={(e) => {
              handleInput(e);
            }}
            type="text"
            name="text"
            placeholder="Username"
            required
            value={name}
            id="name"
            className="signupform_fullname text-foreground"
          />
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
            className="signupform_name text-foreground"
          />

          <div className="signupform_password_wrap">
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
              className="signupform_password text-foreground"
            />
            {show === "password" && (
              <div className="signupform_password_icon_show_wrap">
                <AiFillEye
                  onClick={() => setShow("text")}
                  className="signupform_password_icon_show text-text"
                />
              </div>
            )}
            {show !== "password" && (
              <div className="signupform_password_icon_hide_wrap">
                <AiFillEyeInvisible
                  onClick={() => setShow("password")}
                  className="signupform_password_icon_hide text-text"
                />
              </div>
            )}
          </div>
          <div className="signupform_confpassword_wrap">
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              type={show2}
              placeholder="Confirm Password"
              name="confirm_password"
              required
              value={confirm_password}
              id="confirm_password"
              className="signupform_confpassword text-foreground"
            />
            {show2 === "password" && (
              <div className="signupform_confpassword_icon_show_wrap">
                <AiFillEye
                  onClick={() => setShow2("text")}
                  className="signupform_confpassword_icon_show text-text"
                />
              </div>
            )}
            {show2 !== "password" && (
              <div className="signupform_confpassword_icon_hide_wrap">
                <AiFillEyeInvisible
                  onClick={() => setShow2("password")}
                  className="signupform_confpassword_icon_hide text-text"
                />
              </div>
            )}
          </div>
          <div
            onClick={() => {
              setisdrop(!isdrop);
            }}
            className={
              isdrop ? "signupform_lang rbb z-[20]" : "signupform_lang bb"
            }
          >
            <span className={lang ? "selected_lang" : "selected_lang_none"}>
              {lang || "-select a language-"}
            </span>
            {isdrop && (
              <div className="selected_lang_drop">
                <button
                onClick={() => {
                  setisdrop(!isdrop);
                }}
                className="fixed z-[50] inset-0 bg-none w-full h-full"></button>
                <div className="relative z-[60] w-full h-[200px] overflow-y-auto shadow-lg">
                <div className="flex flex-col w-full h-full">
                  {langData.map(({ name, id }, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setlangid(id);
                          setLang(name);
                          setisdrop(!isdrop);
                        }}
                        className="drops hover:bg-gray-100 cursor-pointer"
                      >
                        {name}
                      </div>
                    );
                  })}
                </div>
                </div>
              
              </div>
            )}
          </div>

          {/**
         <div className="signupform_gender_wrap">
          <div className="signupform_male">
            <div
              onClick={() => setGender("male")}
              className={`signupform_male_button ${
                gender === "male"
                  ? "signupform_male_button_active"
                  : "signupform_male_button_inactive"
              }`}
            >
              {gender === "male" ? (
                <GrCheckmark className="signupform_male_icon" />
              ) : (
                ""
              )}
            </div>
            <p className="signupform_male_text">Male</p>
          </div>
          <div className="signupform_female">
            <div
              onClick={() => setGender("female")}
              className={`signupform_female_button ${
                gender === "female"
                  ? "signupform_female_button_active"
                  : "signupform_female_button_inactive"
              }`}
            >
              {gender === "female" ? (
                <GrCheckmark className="signupform_female_icon" />
              ) : (
                ""
              )}
            </div>
            <p className="signupform_female_text">Female</p>
          </div>
        </div>
         
         */}

          <button className="signupform_button">
            {loading ? <Loader /> : <span>Sign up</span>}
          </button>
          <div className="signupform_terms">
            <div
              onClick={() => {
                setTerms(!terms);
              }}
              className={`signupform_terms_button ${
                terms
                  ? "signupform_terms_button_active"
                  : "signupform_terms_button_inactive"
              }`}
            ></div>
            <div className="signupform_terms_text">
              <p className="signupform_terms_text1 text-text">
                I have read and accept the{" "}
              </p>
              <p className="signupform_terms_text2 text-foreground dark:text-[#ddff2b]">Terms and Condition</p>
            </div>
          </div>
        </div>

        <span className="signupform_or text-text">- or -</span>
        <div className="login_socials inset-x-0 flex items-center w-full mx-auto h-fit">
          <div className="hidden">
            <GetFacebookAuth data={data} setData={setData} />
          </div>

          <div className="hidden w-[45px] h-[45px]">
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

export default SignupForm;
