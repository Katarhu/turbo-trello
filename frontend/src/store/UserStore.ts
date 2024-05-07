import { AxiosError } from "axios";
import { action, flow, observable } from "mobx";

import { AccessTokenApi } from "../api/AccessTokenApi.ts";
import { AuthApi } from "../api/AuthApi.ts";
import {
  RegisterError,
  ICreateUser,
  ILoginResponse,
  ILoginUser,
  LoginRestrictedError,
  InvalidCredentialsError,
} from "../api/AuthApiTypes.ts";
import { OnErrorCallback, OnSuccessCallback } from "~types/StoreTypes.ts";
import { IUser } from "~types/User.ts";

import { RootStore } from "./Store.ts";

export class UserStore {
  @observable
  user: IUser | null = null;

  @observable
  accessToken: string | null = null;

  constructor(private readonly rootStore: RootStore) {}

  @action
  logOut() {
    this.user = null;
    this.accessToken = null;
  }

  @action
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  @flow
  async loginUser<TError = LoginRestrictedError | InvalidCredentialsError>(
    body: ILoginUser,
    onSuccess?: OnSuccessCallback<ILoginResponse>,
    onError?: OnErrorCallback<TError>
  ) {
    try {
      const { data } = await AuthApi.loginUser(body);

      this.user = data.user;
      this.accessToken = data.accessToken;

      AccessTokenApi.setToken(data.accessToken);

      if (onSuccess) onSuccess(data);
    } catch (error) {
      const errorResponse = (error as AxiosError<TError>).response!.data;

      if (onError) onError(errorResponse);
    }
  }

  @flow
  async registerUser<TError = RegisterError>(
    body: ICreateUser,
    onSuccess?: OnSuccessCallback<void>,
    onError?: OnErrorCallback<TError>
  ) {
    try {
      const { data } = await AuthApi.createUser(body);

      if (onSuccess) onSuccess(data);
    } catch (error) {
      const errorResponse = (error as AxiosError<TError>).response!.data;

      if (onError) onError(errorResponse);
    }
  }
}
