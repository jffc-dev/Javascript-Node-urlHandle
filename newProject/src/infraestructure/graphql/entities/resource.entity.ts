import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ResourceStatus } from 'generated/prisma';
import { Resource as DomainResource } from 'src/domain/resource';
import { Flag } from './flag.entity';
import { Participant } from './participant.entity';

registerEnumType(ResourceStatus, {
  name: 'ResourceStatusGQL',
});

@ObjectType()
export class Resource {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  url: string;

  @Field(() => ResourceStatus)
  status: ResourceStatus;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date | null;

  @Field(() => [Participant], { nullable: true })
  participants?: Participant[];

  @Field(() => [Flag], { nullable: true })
  flags?: Flag[];

  static fromDomainToEntity(domainObject: DomainResource): Resource {
    return {
      id: domainObject.id,
      title: domainObject.title,
      url: domainObject.url,
      status: domainObject.status,
      createdAt: domainObject.createdAt,
      updatedAt: domainObject.updatedAt,
    };
  }
}
