import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class UpdateFlagInput {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}
