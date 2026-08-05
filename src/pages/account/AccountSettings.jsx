import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./accountSettings.scss";
import Container from "../../components/container/Container";
import HeadMeta from "../../components/head-meta";
import HeaderRouter from "../../components/headerRouter/HeaderRouter";
import { useSubscription } from "../../hooks/subscription";
import { changePassword } from "../../services/account.service";
import avatar from "../../assets/svg/avatar.svg";
import { RiUser3Line, RiLockPasswordLine, RiVipCrownLine, RiLogoutBoxRLine } from "react-icons/ri";

const AccountSettings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState(null);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" });

  const {
    startSubscription,
    startSubscriptionFlutterwave,
    refreshFeatures,
    loading: subscriptionLoading,
    error: subscriptionError,
    features,
    clearError,
  } = useSubscription();

  useEffect(() => {
    if (!currentUser?.id || !token) {
      navigate("/auth/login?redirect=account");
    }
  }, [currentUser, token, navigate]);

  useEffect(() => {
    if (currentUser?.id) {
      refreshFeatures();
    }
  }, [currentUser?.id, refreshFeatures]);

  const isPremium =
    features?.feature_flags?.multi_lecturer_follow === true ||
    features?.plan === "paid_monthly" ||
    features?.subscription_status === "active";

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage({ type: "", text: "" });

    if (passwords.new !== passwords.confirm) {
      setPasswordMessage({ type: "error", text: "New passwords do not match" });
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordMessage({ type: "error", text: "Password must be at least 8 characters" });
      return;
    }

    setPasswordLoading(true);
    try {
      await changePassword(currentUser.id, passwords.current, passwords.new);
      setPasswordMessage({ type: "success", text: "Password changed successfully!" });
      setPasswords({ current: "", new: "", confirm: "" });
      setActiveTab(null);
    } catch (err) {
      setPasswordMessage({ type: "error", text: err.message || "Failed to change password" });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleSubscribe = async (provider) => {
    clearError();
    if (provider === "flutterwave") {
      await startSubscriptionFlutterwave();
    } else {
      await startSubscription();
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  if (!currentUser?.id) return null;

  return (
    <Container>
      <HeadMeta title="Account Settings - Dawah Nigeria" />
      <div className="account_wrapper">
        <div className="account_header_link bg-background">
          <HeaderRouter title="Account" />
        </div>

        <div className="account_profile_header">
          <div className="account_img_wrap">
            <img className="account_img_wrap_sz" src={avatar} alt="avatar" />
          </div>
          <div className="account_user_info">
            <span className="account_name">{currentUser?.username}</span>
            <span className="account_email">{currentUser?.email}</span>
            {isPremium && <span className="account_badge">Premium</span>}
          </div>
        </div>

        <div className="account_menu_wrap">
          {/* Subscription */}
          <div
            className={`account_menu_item ${activeTab === "subscription" ? "active" : ""}`}
            onClick={() => setActiveTab(activeTab === "subscription" ? null : "subscription")}
          >
            <div className="account_menu_icon">
              <RiVipCrownLine className="icon" />
            </div>
            <div className="account_menu_text">
              <p className="account_menu_title">Subscription</p>
              <p className="account_menu_subtitle">
                {isPremium ? "Premium Plan" : "Free Plan"}
              </p>
            </div>
          </div>

          {activeTab === "subscription" && (
            <div className="account_expand_section">
              {isPremium ? (
                <div className="account_premium_info">
                  <p className="premium_status_text">You have Premium access</p>
                  <ul className="premium_features">
                    <li>✓ Follow multiple lecturers</li>
                    <li>✓ Exclusive content access</li>
                    <li>✓ Ad-free experience</li>
                  </ul>
                </div>
              ) : (
                <div className="account_upgrade_section">
                  <p className="upgrade_text">
                    Upgrade to Premium for exclusive features
                  </p>
                  {subscriptionError && (
                    <p className="error_text">{subscriptionError}</p>
                  )}
                  <button
                    className="account_btn paystack_btn"
                    onClick={() => handleSubscribe("paystack")}
                    disabled={subscriptionLoading}
                  >
                    {subscriptionLoading ? "Processing..." : "Pay with Paystack"}
                  </button>
                  <button
                    className="account_btn flutterwave_btn"
                    onClick={() => handleSubscribe("flutterwave")}
                    disabled={subscriptionLoading}
                  >
                    {subscriptionLoading ? "Processing..." : "Pay with Flutterwave"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Change Password */}
          <div
            className={`account_menu_item ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab(activeTab === "password" ? null : "password")}
          >
            <div className="account_menu_icon">
              <RiLockPasswordLine className="icon" />
            </div>
            <div className="account_menu_text">
              <p className="account_menu_title">Change Password</p>
              <p className="account_menu_subtitle">Update your password</p>
            </div>
          </div>

          {activeTab === "password" && (
            <form className="account_expand_section" onSubmit={handlePasswordSubmit}>
              <div className="account_form_group">
                <label>Current Password</label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  autoComplete="current-password"
                  placeholder="Enter current password"
                  required
                />
              </div>
              <div className="account_form_group">
                <label>New Password</label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  autoComplete="new-password"
                  placeholder="Enter new password"
                  minLength={8}
                  required
                />
              </div>
              <div className="account_form_group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  autoComplete="new-password"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              {passwordMessage.text && (
                <p className={`form_message ${passwordMessage.type}`}>
                  {passwordMessage.text}
                </p>
              )}
              <button
                type="submit"
                className="account_btn primary_btn"
                disabled={passwordLoading}
              >
                {passwordLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}

          {/* Logout */}
          <div className="account_menu_item logout_item" onClick={handleLogout}>
            <div className="account_menu_icon logout_icon">
              <RiLogoutBoxRLine className="icon" />
            </div>
            <div className="account_menu_text">
              <p className="account_menu_title">Log Out</p>
              <p className="account_menu_subtitle">Sign out of your account</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AccountSettings;
