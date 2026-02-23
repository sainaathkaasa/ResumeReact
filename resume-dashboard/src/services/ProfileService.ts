// import axios from "axios";
import api from "../api/api";

// const API_URL = "http://localhost:9090/GetProfile";

export const getProfile = async () => {
  return await api.get("/GetProfile");
};

export const upsertProfile = async (Profile : any) => {
  return await api.post("/UpsertProfile", Profile)
}