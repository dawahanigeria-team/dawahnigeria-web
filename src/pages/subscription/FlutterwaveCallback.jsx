import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSubscription } from "../../hooks/subscription";
import { HOME } from "../../utils/routes/constants";

/**
 * Flutterwave Callback Page
 *
 * This page handles the redirect from Flutterwave after payment.
 * Flow:
 * 1. Read `transaction_id` and `status` from URL query params
 * 2. If status=successful, verify payment via backend
 * 3. Refresh user features/entitlements
 * 4. Redirect user to app with success/fail message
 */
const FlutterwaveCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("Verifying your payment...");

  const {
    verifySubscriptionFlutterwave,
    refreshFeatures,
    loading,
    error,
    isLoggedIn,
  } = useSubscription();

  const handleVerification = useCallback(async () => {
    const transactionId = searchParams.get("transaction_id");
    const txRef = searchParams.get("tx_ref");
    const flwStatus = searchParams.get("status");

    // Log params for debug/support
    console.log("[Flutterwave Callback]", {
      status: flwStatus,
      transaction_id: transactionId,
      tx_ref: txRef,
    });

    // Check if payment was cancelled or failed at Flutterwave
    if (flwStatus && flwStatus !== "successful") {
      setStatus("error");
      setMessage(
        flwStatus === "cancelled"
          ? "Payment was cancelled. Please try again."
          : "Payment was not successful. Please try again."
      );
      return;
    }

    if (!transactionId) {
      setStatus("error");
      setMessage("Missing transaction ID. Please try again.");
      return;
    }

    if (!isLoggedIn) {
      setStatus("error");
      setMessage("Please log in to complete your subscription.");
      return;
    }

    try {
      setStatus("verifying");
      setMessage("Verifying your payment...");

      const verifyResult = await verifySubscriptionFlutterwave(transactionId);

      if (!verifyResult || !verifyResult.success) {
        setStatus("error");
        setMessage(
          verifyResult?.message ||
            "Payment verification failed. Please contact support."
        );
        return;
      }

      setMessage("Payment verified! Activating your subscription...");

      const features = await refreshFeatures();

      if (features) {
        setStatus("success");
        setMessage("Subscription activated successfully!");

        setTimeout(() => {
          navigate(HOME, {
            state: {
              subscriptionSuccess: true,
              plan: features.plan,
              message: "Welcome to Premium! Enjoy your new features.",
            },
          });
        }, 2000);
      } else {
        setStatus("success");
        setMessage("Subscription activated! Redirecting...");

        setTimeout(() => {
          navigate(HOME, {
            state: {
              subscriptionSuccess: true,
              message: "Subscription activated successfully!",
            },
          });
        }, 2000);
      }
    } catch (err) {
      setStatus("error");
      setMessage(err?.message || "Something went wrong. Please try again.");
    }
  }, [searchParams, isLoggedIn, verifySubscriptionFlutterwave, refreshFeatures, navigate]);

  useEffect(() => {
    handleVerification();
  }, [handleVerification]);

  const handleRetry = () => {
    handleVerification();
  };

  const handleGoHome = () => {
    navigate(HOME);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-8 text-center">
        {/* Status Icon */}
        <div className="mb-6">
          {status === "verifying" && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}

          {status === "success" && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20">
              <svg
                className="h-8 w-8 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          )}

          {status === "error" && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20">
              <svg
                className="h-8 w-8 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-2">
          {status === "verifying" && "Processing Payment"}
          {status === "success" && "Payment Successful!"}
          {status === "error" && "Payment Failed"}
        </h1>

        {/* Message */}
        <p className="text-gray-400 mb-6">{message}</p>

        {/* Error Details */}
        {error && status === "error" && (
          <p className="text-red-400 text-sm mb-4 bg-red-500/10 p-3 rounded">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {status === "error" && (
            <>
              <button
                onClick={handleRetry}
                disabled={loading}
                className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Retrying..." : "Try Again"}
              </button>
              <button
                onClick={handleGoHome}
                className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
              >
                Go to Home
              </button>
            </>
          )}

          {status === "success" && (
            <button
              onClick={handleGoHome}
              className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
            >
              Continue to App
            </button>
          )}
        </div>

        {/* Support Link */}
        {status === "error" && (
          <p className="mt-6 text-sm text-gray-500">
            Need help?{" "}
            <a
              href="mailto:support@dawahnigeria.com"
              className="text-primary hover:underline"
            >
              Contact Support
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default FlutterwaveCallback;
