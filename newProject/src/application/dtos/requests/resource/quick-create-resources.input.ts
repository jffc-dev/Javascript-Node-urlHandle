import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class QuickCreateResourcesInput {
  @IsOptional()
  @Field(() => [String])
  @IsString({ each: true })
  urls: string[];
}
