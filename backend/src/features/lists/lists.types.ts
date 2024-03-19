import { RequestWithToken } from "~core/types/request.types";

type ListRequestBody = RequestWithToken["body"] & { boardId: string };

export interface ListRequest extends RequestWithToken {
  body: ListRequestBody;
}
