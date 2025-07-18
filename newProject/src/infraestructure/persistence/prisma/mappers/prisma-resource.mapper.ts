import { Prisma, Resource as PrismaResource } from 'generated/prisma';
import { Resource } from 'src/domain/resource';

export class PrismaResourceMapper {
  static toDomain(entity: PrismaResource): Resource {
    return new Resource({
      resourceId: entity.id,
      title: entity.title,
      url: entity.url,
      createdAt: entity.createdAt,
    });
  }

  static toPrisma(resource: Resource): Prisma.ResourceUncheckedCreateInput {
    return {
      id: resource.resourceId,
      title: resource.title,
      url: resource.url,
      createdAt: resource.createdAt,
    };
  }
}
