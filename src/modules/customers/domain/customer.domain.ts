import { IsString, IsNumber, IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CustomerDomain {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  document: number;
}

export class CustomerDomainWithId {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4, { each:true })
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  document: number;
}
