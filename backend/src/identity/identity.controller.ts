import { Body, Controller, Post } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { IdentityService } from "./identity.service";

@Controller("identity")
export class IdentityController {
  constructor(private identityService: IdentityService) {}

  @Post("/")
  getUser(@Body() user: Prisma.IdentityCreateInput) {
    return this.identityService.createUser(user);
  }
}
