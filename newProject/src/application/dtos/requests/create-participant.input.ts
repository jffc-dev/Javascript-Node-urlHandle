import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateParticipantInput {
  @Field(() => String)
  @IsString()
  name: string;
}
