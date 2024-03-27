import { ICommand } from "~common/application/interfaces/ICommand";
import { RefreshTokenResponce } from "~features/auth/application/responces/RefreshTokenResponce";

export abstract class IRefreshTokenCommand extends ICommand<string, RefreshTokenResponce> {
  abstract execute(input: string): Promise<RefreshTokenResponce>;
}
