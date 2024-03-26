import { Module } from "@nestjs/common";

import { CryptoService } from "~common/application/services/CryptoService/CryptoService";
import { CommonServiceToken } from "~common/diTokens";
import { createProvider } from "~utils/functions/createProvider";

@Module({
  providers: [createProvider(CommonServiceToken.CRYPTO_SERVICE, CryptoService)],
  exports: [CommonServiceToken.CRYPTO_SERVICE],
})
export class CommonModule {}
