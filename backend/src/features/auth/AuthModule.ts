import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { CommonModule } from "~common/CommonModule";
import { TokenConfig } from "~config/TokenConfig";
import { LoginUserCommand } from "~features/auth/application/commands/Login/LoginUserCommand";
import { RefreshTokenCommand } from "~features/auth/application/commands/Token/RefreshTokenCommand";
import { AuthService } from "~features/auth/application/services/AuthService/AuthService";
import { TokenService } from "~features/auth/application/services/TokenService/TokenService";
import { UserModule } from "~features/user/UserModule";
import { PrismaModule } from "~prisma/PrismaModule";
import { createProvider } from "~utils/functions/createProvider";

import { AuthCommandToken, AuthRepositoryToken, AuthServiceToken } from "./common/diTokens";
import { LoginAttemptRepository } from "./infrastructure/persistance/LoginAttemptRepository";
import { AuthController } from "./presentation/AuthController";

@Module({
  imports: [
    UserModule,
    PrismaModule,
    CommonModule,
    JwtModule.register({
      secret: process.env[TokenConfig.secretTokenEnvKey],
    }),
  ],
  controllers: [AuthController],
  providers: [
    createProvider(AuthServiceToken.AUTH_SERVICE, AuthService),
    createProvider(AuthServiceToken.TOKEN_SERVICE, TokenService),
    createProvider(AuthRepositoryToken.LOGIN_ATTEMPT_REPOSITORY, LoginAttemptRepository),
    createProvider(AuthCommandToken.LOGIN_USER_COMMAND, LoginUserCommand),
    createProvider(AuthCommandToken.REFRESH_TOKEN_COMMAND, RefreshTokenCommand),
  ],
})
export class AuthModule {}
