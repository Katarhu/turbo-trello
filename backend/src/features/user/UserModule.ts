import { Module } from "@nestjs/common";

import { CommonModule } from "~common/CommonModule";
import { CreateUserCommand } from "~features/user/application/commands/CreateUserCommand";
import { UserService } from "~features/user/application/services/UserService";
import { UserCommandToken, UserRepositoryToken, UserServiceToken } from "~features/user/common/diTokens";
import { UserRepository } from "~features/user/infrastructure/persistance/UserRepository";
import { PrismaModule } from "~prisma/PrismaModule";
import { createProvider } from "~utils/functions/createProvider";

@Module({
  imports: [PrismaModule, CommonModule],
  providers: [
    createProvider(UserRepositoryToken.USER_REPOSITORY, UserRepository),
    createProvider(UserServiceToken.USER_SERVICE, UserService),
    createProvider(UserCommandToken.CREATE_USER_COMMAND, CreateUserCommand),
  ],
  exports: [UserCommandToken.CREATE_USER_COMMAND],
})
export class UserModule {}
