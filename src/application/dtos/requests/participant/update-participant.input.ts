import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class UpdateParticipantInput {
  @Field(() => Int)
  @IsNumber()
  id: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}
