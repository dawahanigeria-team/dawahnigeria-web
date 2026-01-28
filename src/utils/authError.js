export const getAuthErrorMessage = (
  error,
  fallbackMessage = "Something went wrong."
) => error?.response?.data?.message || fallbackMessage;
