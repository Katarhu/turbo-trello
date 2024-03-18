import { JwtPayload } from "~core/types/jwt.types";

export interface BoardsRequest extends Request {
  user: JwtPayload;
}

export interface BoardRequest extends BoardsRequest {
  params: {
    id: string;
  };
}
