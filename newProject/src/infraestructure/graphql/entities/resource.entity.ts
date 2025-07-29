import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Resource as DomainResource } from 'src/domain/resource';

@ObjectType()
export class Resource {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  url: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;

  static fromDomainToEntity(domainObject: DomainResource): Resource {
    return {
      id: domainObject.id,
      title: domainObject.title,
      url: domainObject.url,
      createdAt: domainObject.createdAt,
      updatedAt: domainObject.updatedAt,
    };
  }
}
