import { Validate } from "class-validator";

import { IsValidObjectId } from "~utils/validators/isValidtObjectId";

export class GetListsRequest {
  @Validate(IsValidObjectId)
  readonly boardId: number;
}
