import {
  Prisma,
  Resource as PrismaResource,
  ResourceParticipant,
} from 'generated/prisma';
import { Resource } from 'src/domain/resource';

export class PrismaResourceMapper {
  static toDomain(
    entity: PrismaResource & {
      resourceParticipants?: ResourceParticipant[];
    },
  ): Resource {
    const { resourceParticipants } = entity;
    const participantIds =
      resourceParticipants?.map((rp) => rp.participantId) || [];
    return new Resource({
      id: entity.id,
      uuid: entity.uuid ?? '',
      title: entity.title,
      url: entity.url,
      status: entity.status,
      parent: null,
      children: [],
      flags: [],
      participants: [],
      ratings: [],
      participantIds: participantIds,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
      parentId: entity.parentId,
    });
  }

  static toPrisma(resource: Resource): Prisma.ResourceUncheckedCreateInput {
    return {
      id: resource.id,
      title: resource.title,
      url: resource.url,
      createdAt: resource.createdAt,
    };
  }
}
