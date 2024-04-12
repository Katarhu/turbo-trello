import { UserStore } from "./UserStore.ts";

export class RootStore {
  private readonly _userStore: UserStore;

  constructor() {
    this._userStore = new UserStore(this);
  }

  get userStore(): UserStore {
    return this._userStore;
  }
}
