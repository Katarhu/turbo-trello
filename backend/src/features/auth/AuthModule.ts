import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { CommonModule } from "~common/CommonModule";
import { JwtConfig } from "~config/JwtConfig";
import { LoginUserCommand } from "~features/auth/application/commands/LoginUserCommand";
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
      secret: process.env[JwtConfig.secretTokenEnvKey],
    }),
  ],
  controllers: [AuthController],
  providers: [
    createProvider(AuthServiceToken.AUTH_SERVICE, AuthService),
    createProvider(AuthServiceToken.TOKEN_SERVICE, TokenService),
    createProvider(AuthRepositoryToken.LOGIN_ATTEMPT_REPOSITORY, LoginAttemptRepository),
    createProvider(AuthCommandToken.LOGIN_USER_COMMAND, LoginUserCommand),
  ],
})
export class AuthModule {}
