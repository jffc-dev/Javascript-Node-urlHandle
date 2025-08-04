import { Prisma, Flag as PrismaFlag, Resource } from 'generated/prisma';
import { Flag } from 'src/domain/flag';

export class PrismaFlagMapper {
  static toDomain(
    entity: PrismaFlag & {
      resources?: Resource[];
    },
  ): Flag {
    const { resources } = entity;
    const resourceIds = resources?.map((rp) => rp.id) || [];
    return new Flag({
      id: entity.id,
      uuid: entity.uuid ?? '',
      name: entity.name,
      resources: [],
      resourceIds: resourceIds,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }

  static toPrisma(flag: Flag): Prisma.FlagUncheckedCreateInput {
    return {
      name: flag.name,
    };
  }
}
