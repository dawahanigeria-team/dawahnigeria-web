import React from "react";
import { useSubscription } from "../../hooks/subscription";

/**
 * Subscribe Button Component
 *
 * Example usage:
 * <SubscribeButton />
 * <SubscribeButton provider="flutterwave" />
 * <SubscribeButton className="my-custom-class" />
 * <SubscribeButton label="Upgrade to Premium" />
 *
 * This component handles:
 * - Starting the Paystack or Flutterwave checkout flow
 * - Showing loading state during API call
 * - Displaying errors with retry option
 * - Redirecting to login if user is not authenticated
 *
 * @param {string} provider - "paystack" (default) or "flutterwave"
 */
const SubscribeButton = ({
  className = "",
  label = "Subscribe Now",
  provider = "paystack",
  onError,
}) => {
  const {
    startSubscription,
    startSubscriptionFlutterwave,
    loading,
    error,
    clearError,
    isLoggedIn,
  } = useSubscription();

  const handleClick = async () => {
    clearError();

    if (!isLoggedIn) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login?redirect=subscribe";
      }
      return;
    }

    const startFn =
      provider === "flutterwave"
        ? startSubscriptionFlutterwave
        : startSubscription;

    const result = await startFn();

    if (!result && error && onError) {
      onError(error);
    }
  };

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          px-6 py-3 bg-primary hover:bg-primary/90 
          text-white font-medium rounded-lg 
          transition-all duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center gap-2
          ${className}
        `}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
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
        )}
        {loading ? "Processing..." : label}
      </button>

      {error && (
        <p className="text-red-400 text-sm">
          {error}{" "}
          <button
            onClick={handleClick}
            className="text-primary hover:underline"
          >
            Try again
          </button>
        </p>
      )}
    </div>
  );
};

export default SubscribeButton;
