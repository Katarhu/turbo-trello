import { Inject, Injectable } from "@nestjs/common";

import { IRefreshTokenCommand } from "~features/auth/application/commands/Token/IRefreshTokenCommand";
import { RefreshTokenResponce } from "~features/auth/application/responces/RefreshTokenResponce";
import { IAuthService } from "~features/auth/application/services/AuthService/IAuthService";
import { ITokenService } from "~features/auth/application/services/TokenService/ITokenService";
import { AuthServiceToken } from "~features/auth/common/diTokens";

@Injectable()
export class RefreshTokenCommand implements IRefreshTokenCommand {
  @Inject(AuthServiceToken.TOKEN_SERVICE)
  private _tokenService: ITokenService;

  @Inject(AuthServiceToken.AUTH_SERVICE)
  private _authService: IAuthService;

  async execute(request: string): Promise<RefreshTokenResponce> {
    this._tokenService.validateSync(request);

    const userPayload = this._tokenService.decode(request);

    const user = await this._authService.getUserByEmail(userPayload.email);

    const accessToken = this._tokenService.createAccessToken(user);

    return new RefreshTokenResponce(accessToken);
  }
}
