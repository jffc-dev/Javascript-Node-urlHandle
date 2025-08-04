import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ResourceStatus } from 'generated/prisma';

@InputType()
export class CreateResourceInput {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsUrl()
  url: string;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsEnum(ResourceStatus)
  @Field(() => ResourceStatus, { nullable: true })
  status?: ResourceStatus;

  @IsOptional()
  @Field(() => [Number], { nullable: true })
  @IsNumber({}, { each: true })
  participantIds?: number[];

  @IsOptional()
  @Field(() => [Number], { nullable: true })
  @IsNumber({}, { each: true })
  flagIds?: number[];
}
