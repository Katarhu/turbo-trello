import { BadRequestException, Injectable } from "@nestjs/common";
import { Identity } from "@prisma/client";
import * as bcrypt from "bcrypt";

import { PrismaService } from "~core/prisma/prisma.service";
import { AppJwtService } from "~core/services/app.jwt.service";

import { RegisterCredentialsDto } from "./dto/register.credentials.dto";
import { LoginResponse, RefreshTokenResponse } from "./identity.types";

@Injectable()
export class IdentityService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: AppJwtService
  ) {}

  async validateUser(email: string, password: string): Promise<Identity | null> {
    const identity = await this.prismaService.identity.findUnique({ where: { email } });

    if (!identity) return null;

    const isPasswordCorrect = await bcrypt.compare(password, identity.password);

    if (!isPasswordCorrect) return null;

    return identity;
  }

  getUserByEmail(email: string): Promise<Identity> {
    return this.prismaService.identity.findUnique({ where: { email } });
  }

  async createUser(credentials: RegisterCredentialsDto) {
    const isEmailExist = await this.getUserByEmail(credentials.email);

    if (isEmailExist) throw new BadRequestException({ message: "Email is already exists" });

    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    await this.prismaService.identity.create({
      data: {
        email: credentials.email,
        password: hashedPassword,
      },
    });

    return {
      message: "Registration is successful",
    };
  }

  async loginUser(identity: Identity): Promise<LoginResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, loginAttempts, ...user } = identity;

    return {
      user,
      accessToken: this.jwtService.createAccessToken(identity),
      refreshToken: this.jwtService.createRefreshToken(identity),
    };
  }

  async refreshToken(identity: Identity): Promise<RefreshTokenResponse> {
    return {
      accessToken: this.jwtService.createAccessToken(identity),
    };
  }
}
