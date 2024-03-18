import { IsNotEmpty, IsString } from "class-validator";

export class AccessBoardDto {
  @IsString()
  @IsNotEmpty()
  readonly boardId: string;
}
