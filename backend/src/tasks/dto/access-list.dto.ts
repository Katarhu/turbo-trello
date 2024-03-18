import { IsNotEmpty, IsString } from "class-validator";

export class AccessListDto {
  @IsString()
  @IsNotEmpty()
  listId: string;
}
