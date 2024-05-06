import { action, flow, observable } from "mobx";

import { AuthApi } from "../api/AuthApi.ts";
import { AuthError, ICreateUser, ILoginResponse, ILoginUser } from "../api/AuthApiTypes.ts";
import { OnErrorCallback, OnSuccessCallback } from "~types/StoreTypes.ts";
import { IUser } from "~types/User.ts";

import { RootStore } from "./Store.ts";

export class UserStore {
  @observable
  user: IUser | null = null;

  @observable
  accessToken: string | null = null;

  constructor(private readonly rootStore: RootStore) {}

  @flow
  async loginUser(
    body: ILoginUser,
    onSuccess?: OnSuccessCallback<ILoginResponse>,
    onError?: OnErrorCallback<AuthError>
  ) {
    try {
      const { data } = await AuthApi.loginUser(body);

      this.user = data.user;
      this.accessToken = data.accessToken;

      if (onSuccess) onSuccess(data);
    } catch (error) {
      if (onError) onError(error as AuthError);
    }
  }

  @flow
  async registerUser(body: ICreateUser, onSuccess?: OnSuccessCallback<void>, onError?: OnErrorCallback<AuthError>) {
    try {
      const { data } = await AuthApi.createUser(body);

      if (onSuccess) onSuccess(data);
    } catch (error) {
      if (onError) onError(error as AuthError);
    }
  }
}
