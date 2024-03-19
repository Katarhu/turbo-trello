import { IsNotEmpty, IsString } from "class-validator";

export class ChangeTaskListDto {
  @IsString()
  @IsNotEmpty()
  readonly listId: string;
}
