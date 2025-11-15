import { InputType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsEnum, IsInt, IsOptional } from 'class-validator';
import { ResourceStatus } from 'generated/prisma';

@InputType()
export class ListResourcesInputDto {
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  @Field(() => [Int], { nullable: true })
  participantIds?: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  @Field(() => [Int], { nullable: true })
  flagIds?: number[];

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  page?: number;

  @IsInt()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  limit?: number;

  @IsOptional()
  @IsEnum(ResourceStatus, { each: true })
  @Field(() => [ResourceStatus], { nullable: true })
  statuses?: ResourceStatus[];

  @IsOptional()
  @Field(() => String, { nullable: true })
  urlTitle?: string;
}
