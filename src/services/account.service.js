import { apiService } from "./api";

const api = apiService();

/**
 * Get user profile data
 * @param {number|string} userId
 * @returns {Promise<{success: boolean, data: object}>}
 */
export const getUserProfile = async (userId) => {
  const response = await api.post({
    url: "/user_profile.php",
    payload: {
      action: "get_profile",
      user_id: userId,
    },
  });

  return response;
};

/**
 * Update user profile data
 * @param {number|string} userId
 * @param {object} profileData - { username, email, etc. }
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const updateUserProfile = async (userId, profileData) => {
  const response = await api.post({
    url: "/user_profile.php",
    payload: {
      action: "update_profile",
      user_id: userId,
      ...profileData,
    },
  });

  if (!response.success) {
    throw new Error(response.message || "Failed to update profile");
  }

  return response;
};

/**
 * Change user password
 * @param {number|string} userId
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const changePassword = async (userId, currentPassword, newPassword) => {
  const response = await api.post({
    url: "/user_profile.php",
    payload: {
      action: "change_password",
      user_id: userId,
      current_password: currentPassword,
      new_password: newPassword,
    },
  });

  if (!response.success) {
    throw new Error(response.message || "Failed to change password");
  }

  return response;
};

/**
 * Delete user account
 * @param {number|string} userId
 * @param {string} password - Confirmation password
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const deleteAccount = async (userId, password) => {
  const response = await api.post({
    url: "/user_profile.php",
    payload: {
      action: "delete_account",
      user_id: userId,
      password,
    },
  });

  if (!response.success) {
    throw new Error(response.message || "Failed to delete account");
  }

  return response;
};
