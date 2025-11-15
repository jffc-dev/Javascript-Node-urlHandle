import { Injectable } from '@nestjs/common';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Resource } from 'src/domain/resource';

interface GetResourcesByParticipantIdsUseCaseProps {
  page?: number;
  limit?: number;
  participantIds: number[];
}
@Injectable()
export class GetResourcesByParticipantIdsUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(
    query: GetResourcesByParticipantIdsUseCaseProps,
  ): Promise<Resource[]> {
    const { participantIds } = query;

    const resourceResponse = await this.resourceRepository.findByParticipantIds(
      {
        participantIds,
      },
    );
    return resourceResponse;
  }
}
