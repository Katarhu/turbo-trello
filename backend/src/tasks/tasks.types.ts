import { RequestWithToken } from "~core/types/request.types";

type TaskRequestBody = RequestWithToken["body"] & { listId: string };

export interface TaskRequest extends RequestWithToken {
  body: TaskRequestBody;
}
