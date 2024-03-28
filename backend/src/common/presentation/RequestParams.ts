import { IsInt } from "class-validator";

export class RequestParams {
  @IsInt()
  readonly id: number;
}
