import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  startWebCheckout,
  verifyWebCheckout,
  startWebCheckoutFlutterwave,
  verifyWebCheckoutFlutterwave,
  getUserFeatures,
  redirectToPaystack,
  redirectToFlutterwave,
} from "../../services/subscription.service";

/**
 * Custom hook for managing subscription flow (Paystack & Flutterwave).
 *
 * Usage:
 * const { startSubscription, startSubscriptionFlutterwave, verifySubscription, verifySubscriptionFlutterwave, refreshFeatures, loading, error, features } = useSubscription();
 *
 * // Start checkout with Paystack (redirects to Paystack)
 * await startSubscription();
 *
 * // Start checkout with Flutterwave (redirects to Flutterwave)
 * await startSubscriptionFlutterwave();
 *
 * // After callback, verify payment
 * const result = await verifySubscription(reference); // Paystack
 * const result = await verifySubscriptionFlutterwave(transactionId); // Flutterwave
 *
 * // Refresh user features/entitlements
 * const features = await refreshFeatures();
 */
export const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [features, setFeatures] = useState(null);

  const { currentUser, token } = useSelector((state) => state.user);
  const userId = currentUser?.id;

  /**
   * Start the subscription checkout flow.
   * Redirects user to Paystack payment page.
   */
  const startSubscription = useCallback(async () => {
    if (!userId) {
      setError("Please log in to subscribe");
      return null;
    }

    if (!token) {
      setError("Session expired. Please log in again");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await startWebCheckout(userId);

      if (response.success && response.data?.authorization_url) {
        redirectToPaystack(response.data.authorization_url);
        return response.data;
      } else {
        throw new Error("Invalid checkout response");
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  /**
   * Verify a payment after Paystack redirects back.
   * @param {string} reference - The payment reference from URL query params
   */
  const verifySubscription = useCallback(
    async (reference) => {
      if (!userId) {
        setError("Please log in to verify subscription");
        return null;
      }

      if (!reference) {
        setError("Missing payment reference");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await verifyWebCheckout(userId, reference);
        return response;
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  /**
   * Start the Flutterwave subscription checkout flow.
   * Redirects user to Flutterwave payment page.
   */
  const startSubscriptionFlutterwave = useCallback(async () => {
    if (!userId) {
      setError("Please log in to subscribe");
      return null;
    }

    if (!token) {
      setError("Session expired. Please log in again");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await startWebCheckoutFlutterwave(userId);

      // Handle both data.authorization_url and data.data.link fallback
      const authUrl =
        response.data?.authorization_url || response.data?.data?.link;

      if (response.success && authUrl) {
        // Log reference for debug/support
        if (response.data?.reference) {
          console.log("[Flutterwave] Payment reference:", response.data.reference);
        }
        redirectToFlutterwave(authUrl);
        return response.data;
      } else {
        throw new Error("Invalid checkout response");
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  /**
   * Verify a Flutterwave payment after redirect.
   * @param {string|number} transactionId - The transaction_id from URL query params
   */
  const verifySubscriptionFlutterwave = useCallback(
    async (transactionId) => {
      if (!userId) {
        setError("Please log in to verify subscription");
        return null;
      }

      if (!transactionId) {
        setError("Missing transaction ID");
        return null;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await verifyWebCheckoutFlutterwave(userId, transactionId);
        return response;
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [userId]
  );

  /**
   * Refresh user features/entitlements from the backend.
   * Call this after successful payment verification.
   */
  const refreshFeatures = useCallback(async () => {
    if (!userId) {
      setError("Please log in to view features");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getUserFeatures(userId);
      setFeatures(response);
      return response;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Clear any error state.
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Paystack methods
    startSubscription,
    verifySubscription,
    // Flutterwave methods
    startSubscriptionFlutterwave,
    verifySubscriptionFlutterwave,
    // Common methods
    refreshFeatures,
    clearError,
    // State
    loading,
    error,
    features,
    isLoggedIn: !!userId && !!token,
    userId,
  };
};

/**
 * Extract user-friendly error message from error object.
 * Handles different error status codes per spec.
 */
function getErrorMessage(err) {
  const status = err?.response?.status || err?.status;

  switch (status) {
    case 401:
      return "Session expired or invalid. Please log in again.";
    case 403:
      return "Access denied. You may not have permission for this action.";
    case 400:
      return err?.message || "Invalid request. Please try again.";
    default:
      return err?.message || "Something went wrong. Please try again.";
  }
}

export default useSubscription;
