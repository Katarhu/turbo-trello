import { IsNotEmpty, IsString } from "class-validator";

export class CreateListDto {
  @IsString()
  @IsNotEmpty()
  readonly boardId: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
