import { apiService } from "./api";

const api = apiService();

/**
 * Start a web checkout session with Paystack via the backend.
 * Redirects user to Paystack's authorization_url for payment.
 *
 * @param {number|string} userId - The user's ID
 * @returns {Promise<{success: boolean, data: {reference: string, authorization_url: string, access_code: string}}>}
 */
export const startWebCheckout = async (userId) => {
  const response = await api.post({
    url: "/subscription_api.php",
    payload: {
      action: "start_web_checkout",
      user_id: userId,
    },
  });

  if (!response.success) {
    throw new Error(response.message || "Failed to start checkout");
  }

  return response;
};

/**
 * Verify a web checkout payment after Paystack redirect.
 * Backend activates subscription if payment is successful.
 *
 * @param {number|string} userId - The user's ID
 * @param {string} reference - The payment reference from Paystack callback
 * @returns {Promise<{success: boolean, message: string, data: object}>}
 */
export const verifyWebCheckout = async (userId, reference) => {
  const response = await api.post({
    url: "/subscription_api.php",
    payload: {
      action: "verify_web_checkout",
      user_id: userId,
      reference,
    },
  });

  if (!response.success) {
    throw new Error(response.message || "Failed to verify checkout");
  }

  return response;
};

/**
 * Fetch user entitlements/features from the backend.
 * Use this to refresh subscription status after payment verification.
 *
 * @param {number|string} userId - The user's ID
 * @returns {Promise<{plan: string, subscription_status: string, feature_flags: object}>}
 */
export const getUserFeatures = async (userId) => {
  const response = await api.post({
    url: "/user_features.php",
    payload: {
      user_id: userId,
    },
  });

  if (!response.success) {
    throw new Error(response.message || "Failed to fetch user features");
  }

  return response.data || response;
};

/**
 * Redirect user to Paystack checkout page.
 * Call this after startWebCheckout succeeds.
 *
 * @param {string} authorizationUrl - The authorization_url from startWebCheckout
 */
export const redirectToPaystack = (authorizationUrl) => {
  if (typeof window !== "undefined") {
    window.location.href = authorizationUrl;
  }
};

// ============================================
// FLUTTERWAVE METHODS
// ============================================

/**
 * Start a web checkout session with Flutterwave via the backend.
 * Redirects user to Flutterwave's authorization_url for payment.
 *
 * @param {number|string} userId - The user's ID
 * @returns {Promise<{success: boolean, data: {reference: string, authorization_url: string}}>}
 */
export const startWebCheckoutFlutterwave = async (userId) => {
  const response = await api.post({
    url: "/subscription_api.php",
    payload: {
      action: "start_web_checkout_flutterwave",
      user_id: userId,
    },
  });

  if (!response.success) {
    throw new Error(response.message || "Failed to start Flutterwave checkout");
  }

  return response;
};

/**
 * Verify a Flutterwave payment after redirect.
 * Backend activates subscription if payment is successful.
 *
 * @param {number|string} userId - The user's ID
 * @param {number|string} transactionId - The transaction_id from Flutterwave callback
 * @returns {Promise<{success: boolean, message: string, data: object}>}
 */
export const verifyWebCheckoutFlutterwave = async (userId, transactionId) => {
  const response = await api.post({
    url: "/subscription_api.php",
    payload: {
      action: "verify_web_checkout_flutterwave",
      user_id: userId,
      transaction_id: Number(transactionId),
    },
  });

  if (!response.success) {
    throw new Error(response.message || "Failed to verify Flutterwave payment");
  }

  return response;
};

/**
 * Redirect user to Flutterwave checkout page.
 * Call this after startWebCheckoutFlutterwave succeeds.
 *
 * @param {string} authorizationUrl - The authorization_url from startWebCheckoutFlutterwave
 */
export const redirectToFlutterwave = (authorizationUrl) => {
  if (typeof window !== "undefined") {
    window.location.href = authorizationUrl;
  }
};
