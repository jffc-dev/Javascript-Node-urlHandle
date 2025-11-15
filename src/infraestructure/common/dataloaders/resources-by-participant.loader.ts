import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { GetResourcesByParticipantIdsUseCase } from 'src/application/use-cases/resource/get-by-participant.use-case';
import { Resource } from 'src/domain/resource';

@Injectable()
export class ResourcesByParticipantLoader extends DataLoader<
  number,
  Resource[]
> {
  constructor(
    private readonly getResourcesByParticipantIdsUseCase: GetResourcesByParticipantIdsUseCase,
  ) {
    super((keys: number[]) => this.batchLoadFunction(keys));
  }

  async batchLoadFunction(participantIds: number[]) {
    const resources = await this.getResourcesByParticipantIdsUseCase.execute({
      participantIds,
    });

    const mappedresources = this.mapResults(participantIds, resources);

    return mappedresources;
  }

  mapResults(participantIds: number[], resources: Resource[]): Resource[][] {
    const resourcesMap = participantIds.reduce(
      (acc, participantId) => {
        acc[participantId] = [];
        return acc;
      },
      {} as Record<string, Resource[]>,
    );

    resources.forEach((resource) => {
      if (resource.participantIds && Array.isArray(resource.participantIds)) {
        resource.participantIds.forEach((participantId) => {
          if (resourcesMap[participantId]) {
            resourcesMap[participantId].push(resource);
          }
        });
      }
    });

    return participantIds.map((participantId) => resourcesMap[participantId]);
  }
}
