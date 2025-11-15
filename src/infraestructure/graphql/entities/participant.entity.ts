import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Participant as DomainParticipant } from 'src/domain/participant';

@ObjectType()
export class Participant {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;

  static fromDomainToEntity(domainObject: DomainParticipant): Participant {
    return {
      id: domainObject.id,
      name: domainObject.name,
      createdAt: domainObject.createdAt,
      updatedAt: domainObject.updatedAt,
    };
  }
}
