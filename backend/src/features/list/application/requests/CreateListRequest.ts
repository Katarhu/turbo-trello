import { IsNotEmpty, IsString, Validate } from "class-validator";

import { IsValidObjectId } from "~utils/validators/isValidtObjectId";

export class CreateListRequest {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @Validate(IsValidObjectId)
  readonly boardId: number;
}
