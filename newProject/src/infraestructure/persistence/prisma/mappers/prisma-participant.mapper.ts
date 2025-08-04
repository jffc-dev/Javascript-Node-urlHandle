import {
  Prisma,
  Participant as PrismaParticipant,
  Resource,
} from 'generated/prisma';
import { Participant } from 'src/domain/participant';

export class PrismaParticipantMapper {
  static toDomain(
    entity: PrismaParticipant & {
      resources?: Resource[];
    },
  ): Participant {
    const { resources } = entity;
    console.log(resources, '11');
    const resourceIds = resources?.map((rp) => rp.id) || [];
    return new Participant({
      id: entity.id,
      uuid: entity.uuid ?? '',
      name: entity.name,
      resources: [],
      resourceIds: resourceIds,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }

  static toPrisma(
    participant: Participant,
  ): Prisma.ParticipantUncheckedCreateInput {
    return {
      name: participant.name,
    };
  }
}
