import { JwtPayload } from "~core/types/jwt.types";

export interface RequestWithToken extends Request {
  user: JwtPayload;
}

export interface TargetedRequestWithToken extends RequestWithToken {
  params: {
    id?: string;
  };
}
