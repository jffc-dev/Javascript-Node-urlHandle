import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Resource } from 'src/infraestructure/graphql/entities/resource.entity';

@ObjectType()
export class GetRandomResourceOutputDto {
  @Field(() => [Resource])
  resources: Resource[];

  @Field(() => [Int])
  ids: number[];
}
