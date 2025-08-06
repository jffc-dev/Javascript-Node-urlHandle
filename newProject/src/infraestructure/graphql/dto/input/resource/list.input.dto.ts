import { InputType, Field, Int } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { ResourceStatus } from 'generated/prisma';

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

  @IsOptional()
  @IsEnum(ResourceStatus, { each: true })
  @Field(() => [ResourceStatus], { nullable: true })
  status?: ResourceStatus[];
}
