import axios, { InternalAxiosRequestConfig } from "axios";

import { AuthApi } from "../api/AuthApi.ts";
import { ApiConstants } from "~constants/ApiConstants.ts";

export const appAxios = axios.create({
  baseURL: ApiConstants.API_URL,
});

export const setupSilentRefresh = (onTokenRefresh: (token: string) => void, onSessionEnd: () => void) => {
  appAxios.interceptors.request.use(
    (config) => config,
    async (error) => {
      const originalRequest: InternalAxiosRequestConfig & { _isRetry?: boolean } = error.config;

      if (!(error.response.status === 401) && !error.config && error._isRetry) throw error;

      originalRequest._isRetry = true;

      try {
        const { data } = await AuthApi.refreshToken();

        onTokenRefresh(data.accessToken);

        return appAxios.request(originalRequest);
      } catch (error) {
        onSessionEnd();
      }
    }
  );
};
