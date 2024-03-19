import { BadRequestException, ExecutionContext, HttpStatus } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { LoginCredentialsDto } from "../dto/login.credentials.dto";
import { validateBody } from "~utils/functions/validate-body";

export class LocalAuthGuard extends AuthGuard("local") {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const errorMessages = await validateBody(LoginCredentialsDto, request.body);

    if (errorMessages.length > 0)
      throw new BadRequestException({
        message: errorMessages,
        error: "Bad request",
        status: HttpStatus.BAD_REQUEST,
      });

    return super.canActivate(context) as boolean | Promise<boolean>;
  }
}
