import { ICommand } from "~common/application/interfaces/ICommand";
import { RefreshTokenDto } from "~features/auth/application/dto/RefreshTokenDto";
import { RefreshTokenResponse } from "~features/auth/application/responses/RefreshTokenResponce";

export abstract class IRefreshTokenCommand extends ICommand<RefreshTokenDto, RefreshTokenResponse> {}
