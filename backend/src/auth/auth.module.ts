import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UserModule } from "../user/user.module";
import { JwtConfig } from "~config/jwt.config";
import { PrismaModule } from "~core/prisma/prisma.module";
import { AppJwtService } from "~core/services/app.jwt.service";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { EncryptionService } from "./encryption.service";
import { LoginService } from "./login.service";
import { LocalAuthStrategy } from "./strategies/local-auth.strategy";
import { RefreshJwtStrategy } from "./strategies/refresh-jwt.strategy";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: process.env[JwtConfig.secretTokenEnvKey],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, EncryptionService, LoginService, LocalAuthStrategy, RefreshJwtStrategy, AppJwtService],
})
export class AuthModule {}
