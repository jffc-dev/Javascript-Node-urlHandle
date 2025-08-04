import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { GetResourcesByFlagIdsUseCase } from 'src/application/use-cases/resource/get-by-flag.use-case';
import { Resource } from 'src/domain/resource';

@Injectable()
export class ResourcesByFlagLoader extends DataLoader<number, Resource[]> {
  constructor(
    private readonly getResourcesByFlagIdsUseCase: GetResourcesByFlagIdsUseCase,
  ) {
    super((keys: number[]) => this.batchLoadFunction(keys));
  }

  async batchLoadFunction(flagIds: number[]) {
    const resources = await this.getResourcesByFlagIdsUseCase.execute({
      flagIds,
    });

    const mappedresources = this.mapResults(flagIds, resources);

    return mappedresources;
  }

  mapResults(flagIds: number[], resources: Resource[]): Resource[][] {
    const resourcesMap = flagIds.reduce(
      (acc, flagId) => {
        acc[flagId] = [];
        return acc;
      },
      {} as Record<string, Resource[]>,
    );

    resources.forEach((resource) => {
      if (resource.flagIds && Array.isArray(resource.flagIds)) {
        resource.flagIds.forEach((flagId) => {
          if (resourcesMap[flagId]) {
            resourcesMap[flagId].push(resource);
          }
        });
      }
    });

    return flagIds.map((flagId) => resourcesMap[flagId]);
  }
}
