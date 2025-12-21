import React, { useState, useEffect } from "react";
import "./forgotpassword.scss";
import { MdEmail, MdCheckCircle } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/loader/loader";
import { toast } from "../../utils/conditionalToast";
import HeadMeta from "../../components/head-meta";
import axios from "../../utils/useAxios";

const RESEND_COOLDOWN_SECONDS = 60;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN_SECONDS);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    let timer;
    if (success && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [success, countdown]);

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  const submitPasswordReset = async () => {
    if (!email) {
      toast.error("Email cannot be empty");
      return;
    }

    // Basic email validation
    if (!EMAIL_REGEX.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        action: "reset_password",
        email,
      };

      const response = await axios.post("/password_reset.php", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      if (response.data.success) {
        setSuccess(true);
        setCountdown(RESEND_COOLDOWN_SECONDS);
        toast.success("Password reset link sent to your email");
      } else {
        toast.error(response.data.message || "Failed to send reset link");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitPasswordReset();
  };

  const handleResend = () => {
    if (countdown === 0) {
      setSuccess(false);
      setCountdown(RESEND_COOLDOWN_SECONDS);
      submitPasswordReset();
    }
  };

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="forgotpassword_wrapper">
      <HeadMeta title="Reset Password | Dawah Nigeria - Home of Islamic resources" />
      <form
        onSubmit={handleSubmit}
        style={{ minHeight: "70vh" }}
        className={`forgotpassword_form ${mounted ? 'form_mounted' : ''}`}
      >
        <div className="w-full form_content">
          {/* Back to Login */}
          <button
            type="button"
            onClick={handleBackToLogin}
            className="back_button"
          >
            <IoArrowBack />
            <span>Back to login</span>
          </button>

          {!success ? (
            <>
              {/* Welcome Text */}
              <div className="welcome_text">
                <h2 className="text-foreground">Forgot password?</h2>
                <p className="text-color">
                  No worries, we'll send you reset instructions
                </p>
              </div>

              {/* Email Input */}
              <div className={`input_group ${focusedField === 'email' ? 'focused' : ''} ${email ? 'has_value' : ''}`}>
                <div className="input_icon">
                  <MdEmail />
                </div>
                <input
                  onChange={handleInput}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  id="email"
                  className="forgotpassword_email text-foreground"
                />
                <div className="input_border"></div>
              </div>

              {/* Submit Button */}
              <button className="forgotpassword_button" type="submit" disabled={loading}>
                {loading ? (
                  <Loader />
                ) : (
                  <span className="button_content">
                    <span>Send reset link</span>
                    <svg className="button_arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="success_content">
                <div className="success_icon_wrapper">
                  <MdCheckCircle className="success_icon" aria-hidden="true" />
                  <div className="success_glow" aria-hidden="true"></div>
                </div>

                <div className="success_text">
                  <h2 className="text-foreground">Check your email</h2>
                  <p className="text-color">
                    We've sent a password reset link to
                  </p>
                  <p className="email_display text-foreground">{email}</p>
                </div>

                <div className="success_instructions text-color">
                  <p>Click the link in the email to reset your password.</p>
                  <p className="mt-2">Didn't receive the email? Check your spam folder.</p>
                </div>

                {/* Resend Button */}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0}
                  className="resend_button"
                >
                  {countdown > 0
                    ? `Resend in ${countdown}s`
                    : "Resend email"
                  }
                </button>

                {/* Back to Login Button */}
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="back_to_login_button"
                >
                  <IoArrowBack />
                  <span>Back to login</span>
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
