import axios from "axios";

import { ApiConstants } from "~constants/ApiConstants.ts";

export const appAxios = axios.create({
  baseURL: ApiConstants.API_URL,
});
