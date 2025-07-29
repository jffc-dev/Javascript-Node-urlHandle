import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from 'src/application/contracts/participant.repository';
import { Participant } from 'src/domain/participant';

interface GetParticipantsByResourceIdsUseCaseProps {
  page?: number;
  limit?: number;
  resourceIds: number[];
}
@Injectable()
export class GetParticipantsByResourceIdsUseCase {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  async execute(
    query: GetParticipantsByResourceIdsUseCaseProps,
  ): Promise<Participant[]> {
    const { resourceIds } = query;

    const resourceResponse = await this.participantRepository.findByResourceIds(
      {
        resourceIds,
      },
    );
    return resourceResponse;
  }
}
