import {
  Prisma,
  Participant as PrismaParticipant,
  ResourceParticipant,
} from 'generated/prisma';
import { Participant } from 'src/domain/participant';

export class PrismaParticipantMapper {
  static toDomain(
    entity: PrismaParticipant & {
      resourceParticipants?: ResourceParticipant[];
    },
  ): Participant {
    const { resourceParticipants } = entity;
    const resourceIds = resourceParticipants?.map((rp) => rp.resourceId) || [];
    return new Participant({
      id: entity.id,
      uuid: entity.uuid ?? '',
      name: entity.name,
      resourceParticipants: [],
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
