import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { GetParticipantsByResourceIdsUseCase } from 'src/application/use-cases/participant/get-by-resource.use-case';
import { Participant } from 'src/domain/participant';

@Injectable()
export class ParticipantsByResourceLoader extends DataLoader<
  number,
  Participant[]
> {
  constructor(
    private readonly getParticipantsByResourceIdsUseCase: GetParticipantsByResourceIdsUseCase,
  ) {
    super((keys: number[]) => this.batchLoadFunction(keys));
  }

  async batchLoadFunction(resourceIds: number[]) {
    const resources = await this.getParticipantsByResourceIdsUseCase.execute({
      resourceIds,
    });

    const mappedresources = this.mapResults(resourceIds, resources);

    return mappedresources;
  }

  mapResults(resourceIds: number[], resources: Participant[]): Participant[][] {
    const participantMap = resourceIds.reduce(
      (acc, resourceId) => {
        acc[resourceId] = [];
        return acc;
      },
      {} as Record<string, Participant[]>,
    );

    resources.forEach((resource) => {
      if (resource.resourceIds && Array.isArray(resource.resourceIds)) {
        resource.resourceIds.forEach((resourceId) => {
          if (participantMap[resourceId]) {
            participantMap[resourceId].push(resource);
          }
        });
      }
    });

    return resourceIds.map((resourceId) => participantMap[resourceId]);
  }
}
