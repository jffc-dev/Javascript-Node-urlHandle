import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class GetResourceInputDto {
  @IsInt()
  @Field(() => Int)
  id: number;
}
