import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsNumber } from 'class-validator';

@InputType()
export class UpdateParticipantInput {
  @Field(() => Number)
  @IsNumber()
  id: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name?: string;
}
