import React, { useState, useEffect } from "react";
import "./signupform.scss";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { MdEmail, MdLock, MdPerson, MdLanguage, MdCheck } from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";
import GetGoogleOAuth from "./socials/googleauth";
import GetFacebookAuth from "./socials/facebookauth";
import { toast } from "../../utils/conditionalToast";
import axios from "../../utils/useAxios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/loader/loader";
import { registration } from "../../Redux/Actions/ActionCreators";
import HeadMeta from "../../components/head-meta";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState("password");
  const [show2, setShow2] = useState("password");
  const [isdrop, setisdrop] = useState(false);
  const [langData, setLangData] = useState([]);
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [langid, setlangid] = useState("");
  const [lang, setLang] = useState("");
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const isSocial = false;

  useEffect(() => {
    setMounted(true);
    axios
      .get(`/all_lang_api.php`)
      .then((res) => {
        setLangData(res.data);
      })
      .catch((err) => {});
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

    for (let i in validateData) {
      if (validateData[i] === "") {
        toast.error(`${i} cannot be empty`);
        return;
      }
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Strong password policy validation
    if (!PASSWORD_REGEX.test(password)) {
      toast.error("Password must be at least 8 characters long and contain both letters and numbers");
      return;
    }

    if (confirm_password !== password) {
      toast.error("Passwords do not match");
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

    dispatch(registration(payload, isSocial, getId, navigate, setLoading));
  };

  const { email, password, name, confirm_password } = data;

  return (
    <div className="signupform_wrapper">
      <HeadMeta title="Sign up on Dawah Nigeria | Home of Islamic resources" />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        style={{ height: `${Math.floor(0.7 * window.innerHeight)}px` }}
        className={`signupform_form ${mounted ? 'form_mounted' : ''}`}
      >
        <div className="w-full form_content">
          {/* Welcome Text */}
          <div className="welcome_text">
            <h2 className="text-foreground">Create account</h2>
            <p className="text-color">Join the Dawah Nigeria community</p>
          </div>

          {/* Username Input */}
          <div className={`input_group ${focusedField === 'name' ? 'focused' : ''} ${name ? 'has_value' : ''}`}>
            <div className="input_icon">
              <MdPerson />
            </div>
            <input
              onChange={(e) => {
                handleInput(e);
              }}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              type="text"
              name="text"
              placeholder="Username"
              required
              value={name}
              id="name"
              className="signupform_fullname text-foreground"
            />
            <div className="input_border"></div>
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
              className="signupform_name text-foreground"
            />
            <div className="input_border"></div>
          </div>

          {/* Password Input */}
          <div className={`input_group ${focusedField === 'password' ? 'focused' : ''} ${password ? 'has_value' : ''}`}>
            <div className="input_icon">
              <MdLock />
            </div>
            <div className="signupform_password_wrap">
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
                className="signupform_password text-foreground"
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

          {/* Confirm Password Input */}
          <div className={`input_group ${focusedField === 'confirm_password' ? 'focused' : ''} ${confirm_password ? 'has_value' : ''}`}>
            <div className="input_icon">
              <MdLock />
            </div>
            <div className="signupform_confpassword_wrap">
              <input
                onChange={(e) => {
                  handleInput(e);
                }}
                onFocus={() => setFocusedField('confirm_password')}
                onBlur={() => setFocusedField(null)}
                type={show2}
                placeholder="Confirm Password"
                name="confirm_password"
                required
                value={confirm_password}
                id="confirm_password"
                className="signupform_confpassword text-foreground"
              />
              <button
                type="button"
                onClick={() => setShow2(show2 === "password" ? "text" : "password")}
                className="password_toggle"
              >
                {show2 === "password" ? (
                  <AiFillEye className="text-color" />
                ) : (
                  <AiFillEyeInvisible className="text-color" />
                )}
              </button>
            </div>
            <div className="input_border"></div>
          </div>

          {/* Language Selector */}
          <div className={`input_group language_select ${isdrop ? 'dropdown_open' : ''} ${lang ? 'has_value' : ''}`}>
            <div className="input_icon">
              <MdLanguage />
            </div>
            <div
              onClick={() => {
                setisdrop(!isdrop);
              }}
              className="language_selector"
            >
              <span className={lang ? "selected_lang" : "selected_lang_none"}>
                {lang || "Select a language"}
              </span>
              <IoChevronDown className={`dropdown_icon ${isdrop ? 'rotated' : ''}`} />
            </div>
            {isdrop && (
              <div className="language_dropdown">
                <button
                  type="button"
                  onClick={() => {
                    setisdrop(!isdrop);
                  }}
                  className="dropdown_backdrop"
                ></button>
                <div className="dropdown_menu">
                  <div className="dropdown_items">
                    {langData.map(({ name, id }, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setlangid(id);
                            setLang(name);
                            setisdrop(!isdrop);
                          }}
                          className={`dropdown_item ${langid === id ? 'selected' : ''}`}
                        >
                          <span>{name}</span>
                          {langid === id && <MdCheck className="check_icon" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            <div className="input_border"></div>
          </div>

          {/* Terms Checkbox */}
          <div className="signupform_terms">
            <button
              type="button"
              onClick={() => {
                setTerms(!terms);
              }}
              className={`terms_checkbox ${terms ? 'checked' : ''}`}
            >
              {terms && <MdCheck className="check_icon" />}
            </button>
            <div className="signupform_terms_text">
              <p className="text-color">
                I have read and accept the{" "}
                <span className="terms_link text-foreground">Terms and Conditions</span>
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button className="signupform_button" disabled={loading}>
            {loading ? (
              <Loader />
            ) : (
              <span className="button_content">
                <span>Create account</span>
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
          <span className="signupform_or text-color">or continue with</span>
          <div className="divider_line"></div>
        </div>

        {/* Social Login */}
        <div className="login_socials inset-x-0 flex items-center w-full mx-auto h-fit">
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

export default SignupForm;
