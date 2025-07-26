import { Prisma, Participant as PrismaParticipant } from 'generated/prisma';
import { Participant } from 'src/domain/participant';

export class PrismaParticipantMapper {
  static toDomain(entity: PrismaParticipant): Participant {
    return new Participant({
      id: entity.id,
      uuid: entity.uuid ?? '',
      name: entity.name,
      resourceParticipants: [],
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
