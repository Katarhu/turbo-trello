import { Body, Controller, Post, UseGuards, Request } from "@nestjs/common";

import { LocalAuthGuard } from "~core/guards/local-auth.guard";
import { RefreshJwtGuard } from "~core/guards/refresh-jwt.guard";

import { RegisterCredentialsDto } from "./dto/register.credentials.dto";
import { IdentityService } from "./identity.service";
import { LoginRequest, RefreshTokenRequest } from "./identity.types";

@Controller("auth")
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() request: LoginRequest) {
    return this.identityService.loginUser(request.user);
  }

  @Post("/register")
  register(@Body() user: RegisterCredentialsDto) {
    return this.identityService.createUser(user);
  }

  @UseGuards(RefreshJwtGuard)
  @Post("/refresh")
  getRefreshToken(@Request() request: RefreshTokenRequest) {
    return this.identityService.refreshToken(request.user);
  }
}
