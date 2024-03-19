import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBoardDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
