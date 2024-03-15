import { BadRequestException, ExecutionContext, HttpStatus } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

import { LoginCredentialsDto } from "~identity/dto/login.credentials.dto";

export class LocalAuthGuard extends AuthGuard("local") {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const body = plainToClass(LoginCredentialsDto, request.body);

    const errors = await validate(body);

    const errorMessages = errors.flatMap(({ constraints }) => Object.values(constraints));

    if (errorMessages.length > 0) {
      throw new BadRequestException({ message: errorMessages, error: "Bad request", status: HttpStatus.BAD_REQUEST });
    }

    return super.canActivate(context) as boolean | Promise<boolean>;
  }
}
