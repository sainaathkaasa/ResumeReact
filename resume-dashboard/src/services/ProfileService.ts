import axios from "axios";

const API_URL = "http://localhost:8080/GetProfile";

export const getProfile = async () => {
  return await axios.get(API_URL);
};
