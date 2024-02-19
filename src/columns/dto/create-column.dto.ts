import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
