import { BoardStore } from "./BoardStore.ts";
import { UserStore } from "./UserStore.ts";

export class RootStore {
  private readonly _userStore: UserStore;
  private readonly _boardStore: BoardStore;

  constructor() {
    this._userStore = new UserStore();
    this._boardStore = new BoardStore();
  }

  get userStore(): UserStore {
    return this._userStore;
  }

  get boardStore(): BoardStore {
    return this._boardStore;
  }
}
