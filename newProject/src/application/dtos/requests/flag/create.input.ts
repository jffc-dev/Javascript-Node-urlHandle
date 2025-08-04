import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateFlagInput {
  @Field(() => String)
  @IsString()
  name: string;
}
