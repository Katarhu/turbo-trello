import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly listId: string;
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
