import { IsNotEmpty, IsString, Validate } from "class-validator";

import { IsValidObjectId } from "~utils/validators/is-valid-objectid.validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsValidObjectId)
  readonly listId: string;
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
