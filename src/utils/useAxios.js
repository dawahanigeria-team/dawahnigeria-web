import axios from "axios";

const FetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default FetchClient();

