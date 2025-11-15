import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ResourceStatus } from 'generated/prisma';

@InputType()
export class UpdateResourceInput {
  @Field(() => Int)
  @IsNumber()
  id: number;

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsUrl()
  url: string;

  @IsOptional()
  @IsEnum(ResourceStatus)
  @Field(() => ResourceStatus)
  status: ResourceStatus;

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  @IsNumber({}, { each: true })
  participantIds?: number[];

  @IsOptional()
  @Field(() => [Int], { nullable: true })
  @IsNumber({}, { each: true })
  flagIds?: number[];
}
