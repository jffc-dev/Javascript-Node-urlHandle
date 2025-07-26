import { Prisma, Resource as PrismaResource } from 'generated/prisma';
import { Resource } from 'src/domain/resource';

export class PrismaResourceMapper {
  static toDomain(entity: PrismaResource): Resource {
    return new Resource({
      id: entity.id,
      uuid: entity.uuid ?? '',
      title: entity.title,
      url: entity.url,
      active: entity.active,
      parent: null,
      children: [],
      flags: [],
      participants: [],
      ratings: [],
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
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
