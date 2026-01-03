import environtment from "@/config/environtment";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL: environtment.API_URL,
  headers,
});

export default instance; 
