import { Controller, Request, Post, UseGuards, Body } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginRequest, RefreshTokenRequest } from "./auth.types";
import { RegisterUserDto } from "./dto/register.credentials.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { RefreshJwtGuard } from "./guards/refresh-jwt.guard";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  loginUser(@Request() request: LoginRequest) {
    return this.authService.loginUser(request.user);
  }

  @Post("register")
  createUser(@Body() createUserData: RegisterUserDto) {
    return this.authService.createUser(createUserData);
  }

  @UseGuards(RefreshJwtGuard)
  @Post("refresh-token")
  refreshToken(@Request() request: RefreshTokenRequest) {
    return this.authService.getAccessToken(request.user);
  }
}
