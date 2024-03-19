import { IsNotEmpty, IsString, Validate } from "class-validator";

import { IsValidObjectId } from "~utils/validators/is-valid-objectid.validator";

export class AccessListDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsValidObjectId)
  readonly listId: string;
}
