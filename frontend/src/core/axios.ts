import axios from "axios";

const URL = "http://127.0.0.1:8000/";

export const appAxios = axios.create({
  baseURL: URL,
});
