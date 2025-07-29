import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class ListResourcesInputDto {
  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  participantId?: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  page?: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  limit?: number;
}
