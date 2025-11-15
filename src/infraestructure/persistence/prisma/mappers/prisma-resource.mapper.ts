import {
  Flag,
  Participant,
  Prisma,
  Resource as PrismaResource,
} from 'generated/prisma';
import { Resource } from 'src/domain/resource';

export class PrismaResourceMapper {
  static toDomain(
    entity: PrismaResource & {
      participants?: Partial<Participant>[];
      flags?: Partial<Flag>[];
    },
  ): Resource {
    const { participants, flags } = entity;
    const participantIds = participants?.map((rp) => rp.id!) || [];
    const flagIds = flags?.map((rp) => rp.id!) || [];
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
      flagIds: flagIds,
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
