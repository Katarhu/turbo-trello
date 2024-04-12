import { Validate } from "class-validator";

import { IsValidObjectId } from "~utils/validators/isValidtObjectId";

export class GetTasksRequest {
  @Validate(IsValidObjectId)
  readonly listId: number;
}
