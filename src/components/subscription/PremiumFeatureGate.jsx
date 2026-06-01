import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "../../hooks/subscription";

/**
 * PremiumFeatureGate Component
 *
 * Wraps premium features and shows upgrade prompt for free users.
 * Premium users see the children content directly.
 *
 * Usage:
 * <PremiumFeatureGate featureName="Follow Multiple Lecturers">
 *   <MultiLecturerFollowButton />
 * </PremiumFeatureGate>
 *
 * @param {React.ReactNode} children - The premium feature content
 * @param {string} featureName - Name of the feature (for display)
 * @param {function} onUpgradeClick - Optional callback when upgrade is clicked
 * @param {boolean} showInline - Show inline prompt instead of modal (default: false)
 */
const PremiumFeatureGate = ({
  children,
  featureName = "this feature",
  onUpgradeClick,
  showInline = false,
}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const {
    startSubscription,
    startSubscriptionFlutterwave,
    loading,
    error,
    clearError,
    features,
    isLoggedIn,
  } = useSubscription();

  const isPremium =
    features?.feature_flags?.multi_lecturer_follow === true ||
    features?.plan === "paid_monthly" ||
    features?.subscription_status === "active";

  const handleFeatureClick = () => {
    if (!isLoggedIn) {
      navigate("/auth/login?redirect=premium");
      return;
    }

    if (!isPremium) {
      setShowModal(true);
    }
  };

  const handleSubscribe = async (provider = "paystack") => {
    clearError();
    if (onUpgradeClick) {
      onUpgradeClick(provider);
    }

    if (provider === "flutterwave") {
      await startSubscriptionFlutterwave();
    } else {
      await startSubscription();
    }
  };

  const handleClose = () => {
    setShowModal(false);
    clearError();
  };

  // Premium users see the content directly
  if (isPremium) {
    return <>{children}</>;
  }

  // Inline prompt for free users
  if (showInline) {
    return (
      <div className="premium-gate-inline">
        <div
          onClick={handleFeatureClick}
          className="premium-gate-trigger"
          style={{ cursor: "pointer", position: "relative" }}
        >
          {children}
          <div className="premium-overlay">
            <span className="premium-lock">🔒</span>
            <span className="premium-label">Premium</span>
          </div>
        </div>

        {showModal && (
          <PremiumModal
            featureName={featureName}
            loading={loading}
            error={error}
            onSubscribe={handleSubscribe}
            onClose={handleClose}
          />
        )}
      </div>
    );
  }

  // Wrapped content that triggers modal on click
  return (
    <>
      <div
        onClick={handleFeatureClick}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>

      {showModal && (
        <PremiumModal
          featureName={featureName}
          loading={loading}
          error={error}
          onSubscribe={handleSubscribe}
          onClose={handleClose}
        />
      )}
    </>
  );
};

/**
 * Premium Upgrade Modal
 */
const PremiumModal = ({ featureName, loading, error, onSubscribe, onClose }) => {
  return (
    <div className="premium-modal-overlay" onClick={onClose}>
      <div
        className="premium-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#1f2937",
          borderRadius: "12px",
          padding: "24px",
          maxWidth: "400px",
          width: "90%",
          zIndex: 1001,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "transparent",
            border: "none",
            color: "#9ca3af",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: "rgba(221, 255, 43, 0.2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "28px",
            }}
          >
            ⭐
          </div>
          <h2
            style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Upgrade to Premium
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.5" }}>
            <strong style={{ color: "#ddff2b" }}>{featureName}</strong> is a
            premium feature. Upgrade now to unlock all premium benefits!
          </p>
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "0 0 20px",
          }}
        >
          {[
            "Follow multiple lecturers",
            "Exclusive content access",
            "Ad-free experience",
            "Priority support",
          ].map((benefit, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#d1d5db",
                fontSize: "13px",
                marginBottom: "8px",
              }}
            >
              <span style={{ color: "#22c55e" }}>✓</span>
              {benefit}
            </li>
          ))}
        </ul>

        {error && (
          <p
            style={{
              color: "#ef4444",
              fontSize: "12px",
              background: "rgba(239, 68, 68, 0.1)",
              padding: "8px",
              borderRadius: "4px",
              marginBottom: "12px",
            }}
          >
            {error}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={() => onSubscribe("paystack")}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#00c3f7",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Processing..." : "Pay with Paystack"}
          </button>
          <button
            onClick={() => onSubscribe("flutterwave")}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#f5a623",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Processing..." : "Pay with Flutterwave"}
          </button>
        </div>

        <p
          style={{
            color: "#6b7280",
            fontSize: "11px",
            textAlign: "center",
            marginTop: "16px",
          }}
        >
          Secure payment powered by Paystack & Flutterwave
        </p>
      </div>

      {/* Overlay background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.7)",
          zIndex: 1000,
        }}
      />
    </div>
  );
};

export default PremiumFeatureGate;
