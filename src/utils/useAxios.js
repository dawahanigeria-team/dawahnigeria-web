import axios from "axios";

const FetchClient = () => {
  const defaultOptions = {
    baseURL: "https://www.dawahbox.com/mongo/api",
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default FetchClient();


