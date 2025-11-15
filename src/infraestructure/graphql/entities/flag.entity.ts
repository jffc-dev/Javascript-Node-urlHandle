import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Flag as DomainFlag } from 'src/domain/flag';

@ObjectType()
export class Flag {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;

  static fromDomainToEntity(domainObject: DomainFlag): Flag {
    return {
      id: domainObject.id,
      name: domainObject.name,
      createdAt: domainObject.createdAt,
      updatedAt: domainObject.updatedAt,
    };
  }
}
