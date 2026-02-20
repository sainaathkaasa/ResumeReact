// import axios from "axios";
import api from "../api/api";

export const getLanguages = async () => {
  return await api.get("/Languages");
};
