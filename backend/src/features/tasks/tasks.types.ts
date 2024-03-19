import { RequestWithToken } from "~core/types/request.types";

import { AccessListDto } from "./dto/access-list.dto";

type TaskRequestBody = RequestWithToken["body"] & AccessListDto;

export interface TaskRequest extends RequestWithToken {
  body: TaskRequestBody;
}
