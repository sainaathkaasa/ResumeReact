import axios from "axios";

export const getLanguages = async () => {
  return await axios.get("http://localhost:8080/Languages");
};
