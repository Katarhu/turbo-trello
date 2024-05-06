import { AxiosResponse } from "axios";

import { appAxios } from "../core/axios.ts";

import { ICreateUser, ILoginResponse, ILoginUser, IRefreshTokenResponse } from "./AuthApiTypes.ts";

export class AuthApi {
  static createUser(data: ICreateUser): Promise<AxiosResponse<void>> {
    return appAxios.post<void>("auth/register", data);
  }

  static loginUser(data: ILoginUser): Promise<AxiosResponse<ILoginResponse>> {
    return appAxios.post("auth/login", data);
  }

  static refreshToken(): Promise<AxiosResponse<IRefreshTokenResponse>> {
    return appAxios.post("auth/refresh");
  }
}
