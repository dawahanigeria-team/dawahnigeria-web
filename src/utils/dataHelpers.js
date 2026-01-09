/**
 * Extracts an array of data from an API response.
 * Handles cases where the response itself is the array, or the array is nested in a 'data' property.
 * Returns an empty array if no valid array data is found.
 * 
 * @param {any} response - The API response to process
 * @returns {Array} The extracted data array
 */
export const extractArrayData = (response) => {
  if (Array.isArray(response?.data)) {
    return response.data;
  }
  if (Array.isArray(response)) {
    return response;
  }
  return [];
};
