import React, { useState, useEffect } from "react";
import "./forgotpassword.scss";
import { MdEmail, MdCheckCircle, MdLock, MdVpnKey } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/UI/loader/loader";
import { toast } from "../../utils/conditionalToast";
import HeadMeta from "../../components/head-meta";
import axios from "../../utils/useAxios";
import { getAuthErrorMessage } from "../../utils/authError";

const RESEND_COOLDOWN_SECONDS = 60;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [step, setStep] = useState(1); // 1 = email entry, 2 = code entry, 3 = success
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN_SECONDS);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, countdown]);

  const handleInput = (e) => {
    setEmail(e.target.value);
  };

  // Step 1: Request reset code
  const requestResetCode = async () => {
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
        action: "request_reset",
        email,
      };

      const response = await axios.post("/forgot_passwordApi.php", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      if (response.data.success) {
        setStep(2);
        setCountdown(RESEND_COOLDOWN_SECONDS);
        toast.success(response.data.message || "Verification code sent to your email");
      } else {
        toast.error(response.data.message || "Failed to send reset code");
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        getAuthErrorMessage(error, "An error occurred. Please try again.")
      );
    }
  };

  // Step 2: Reset password with code
  const resetPasswordWithCode = async () => {
    if (!code || code.length !== 6) {
      toast.error("Please enter the 6-digit verification code");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        action: "reset_password",
        email,
        code,
        password,
      };

      const response = await axios.post("/forgot_passwordApi.php", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      if (response.data.success) {
        setStep(3);
        toast.success(response.data.message || "Password reset successfully");
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        getAuthErrorMessage(error, "An error occurred. Please try again.")
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      await requestResetCode();
    } else if (step === 2) {
      await resetPasswordWithCode();
    }
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(RESEND_COOLDOWN_SECONDS);
      requestResetCode();
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

          {step === 1 && (
            <>
              {/* Welcome Text */}
              <div className="welcome_text">
                <h2 className="text-foreground">Forgot password?</h2>
                <p className="text-color">
                  No worries, we'll send you a verification code
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
                    <span>Send verification code</span>
                    <svg className="button_arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* Step 2: Enter code and new password */}
              <div className="welcome_text">
                <h2 className="text-foreground">Reset your password</h2>
                <p className="text-color">
                  Enter the 6-digit code sent to <strong>{email}</strong>
                </p>
              </div>

              {/* Verification Code Input */}
              <div className={`input_group ${focusedField === 'code' ? 'focused' : ''} ${code ? 'has_value' : ''}`}>
                <div className="input_icon">
                  <MdVpnKey />
                </div>
                <input
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  onFocus={() => setFocusedField('code')}
                  onBlur={() => setFocusedField(null)}
                  type="text"
                  inputMode="numeric"
                  name="code"
                  placeholder="Enter 6-digit code"
                  required
                  value={code}
                  id="code"
                  className="forgotpassword_email text-foreground"
                  maxLength={6}
                />
                <div className="input_border"></div>
              </div>

              {/* New Password Input */}
              <div className={`input_group ${focusedField === 'password' ? 'focused' : ''} ${password ? 'has_value' : ''}`}>
                <div className="input_icon">
                  <MdLock />
                </div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="New password (min 6 characters)"
                  required
                  value={password}
                  id="password"
                  className="forgotpassword_email text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password_toggle"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
                <div className="input_border"></div>
              </div>

              {/* Confirm Password Input */}
              <div className={`input_group ${focusedField === 'confirmPassword' ? 'focused' : ''} ${confirmPassword ? 'has_value' : ''}`}>
                <div className="input_icon">
                  <MdLock />
                </div>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  required
                  value={confirmPassword}
                  id="confirmPassword"
                  className="forgotpassword_email text-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password_toggle"
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </button>
                <div className="input_border"></div>
              </div>

              {/* Reset Password Button */}
              <button className="forgotpassword_button" type="submit" disabled={loading}>
                {loading ? (
                  <Loader />
                ) : (
                  <span className="button_content">
                    <span>Reset password</span>
                    <svg className="button_arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>

              {/* Resend Code */}
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0}
                className="resend_button"
              >
                {countdown > 0
                  ? `Resend code in ${countdown}s`
                  : "Resend code"
                }
              </button>
            </>
          )}

          {step === 3 && (
            <>
              {/* Success State */}
              <div className="success_content">
                <div className="success_icon_wrapper">
                  <MdCheckCircle className="success_icon" aria-hidden="true" />
                  <div className="success_glow" aria-hidden="true"></div>
                </div>

                <div className="success_text">
                  <h2 className="text-foreground">Password reset successful!</h2>
                  <p className="text-color">
                    Your password has been updated.
                  </p>
                </div>

                <div className="success_instructions text-color">
                  <p>You can now log in with your new password.</p>
                </div>

                {/* Back to Login Button */}
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="back_to_login_button"
                >
                  <IoArrowBack />
                  <span>Go to login</span>
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
