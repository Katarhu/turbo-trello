import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { JwtConstants } from "~core/constants/jwt.constants";
import { PrismaModule } from "~core/prisma/prisma.module";
import { AppJwtService } from "~core/services/app.jwt.service";
import { LocalAuthStrategy } from "~core/strategies/local-auth.strategy";
import { RefreshJwtStrategy } from "~core/strategies/refresh-jwt.strategy";

import { IdentityController } from "./identity.controller";
import { IdentityService } from "./identity.service";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env[JwtConstants.secretTokenEnvKey],
    }),
  ],
  controllers: [IdentityController],
  providers: [IdentityService, AppJwtService, LocalAuthStrategy, RefreshJwtStrategy],
})
export class IdentityModule {}
