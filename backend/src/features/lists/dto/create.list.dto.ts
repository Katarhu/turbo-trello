import { IsNotEmpty, IsString, Validate } from "class-validator";

import { IsValidObjectId } from "~utils/validators/is-valid-objectid.validator";

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsValidObjectId)
  readonly boardId: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
