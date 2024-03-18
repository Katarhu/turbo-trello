import { IsNotEmpty, IsString } from "class-validator";

export class ChangeTaskListDto {
  @IsString()
  @IsNotEmpty()
  readonly previousListId: string;
  @IsString()
  @IsNotEmpty()
  readonly newListId: string;
}
