import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, Validate } from 'class-validator';
import { SizeGreaterThanInitialIdsConstraint } from './validators/size.validator';

@InputType()
export class GetRandomResourceInputDto {
  @IsInt()
  @Field(() => Int)
  @Validate(SizeGreaterThanInitialIdsConstraint)
  size: number;

  @IsInt({ each: true })
  @IsOptional()
  @Field(() => [Int], { nullable: true })
  initialIds?: number[];
}
