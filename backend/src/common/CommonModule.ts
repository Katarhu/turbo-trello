import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { CryptoService } from "~common/application/services/CryptoService/CryptoService";
import { TokenService } from "~common/application/services/TokenService/TokenService";
import { CommonServiceToken } from "~common/diTokens";
import { TokenConfig } from "~config/TokenConfig";
import { createProvider } from "~utils/functions/createProvider";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env[TokenConfig.secretTokenEnvKey],
    }),
  ],
  providers: [
    createProvider(CommonServiceToken.CRYPTO_SERVICE, CryptoService),
    createProvider(CommonServiceToken.TOKEN_SERVICE, TokenService),
  ],
  exports: [CommonServiceToken.CRYPTO_SERVICE, CommonServiceToken.TOKEN_SERVICE],
})
export class CommonModule {}
