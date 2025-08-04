import { InputType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export enum ResourceStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DELETED = 'DELETED',
}

registerEnumType(ResourceStatus, {
  name: 'ResourceStatus',
});

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
