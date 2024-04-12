import { action } from "mobx";

import { RootStore } from "./Store.ts";

export class UserStore {
  constructor(private readonly rootStore: RootStore) {}

  @action
  setUser() {}
}
