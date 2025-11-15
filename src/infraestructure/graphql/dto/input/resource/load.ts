import { Field, InputType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';

@InputType()
export class LoadTitleInputDto {
  @Field(() => String)
  @IsUrl()
  url: string;
}
