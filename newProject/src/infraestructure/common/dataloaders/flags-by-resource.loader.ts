import { Injectable } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { GetFlagsByResourceIdsUseCase } from 'src/application/use-cases/flag/get-by-resource.use-case';
import { Flag } from 'src/domain/flag';

@Injectable()
export class FlagsByResourceLoader extends DataLoader<number, Flag[]> {
  constructor(
    private readonly getFlagsByResourceIdsUseCase: GetFlagsByResourceIdsUseCase,
  ) {
    super((keys: number[]) => this.batchLoadFunction(keys));
  }

  async batchLoadFunction(resourceIds: number[]) {
    const resources = await this.getFlagsByResourceIdsUseCase.execute({
      resourceIds,
    });

    const mappedResources = this.mapResults(resourceIds, resources);

    return mappedResources;
  }

  mapResults(resourceIds: number[], flag: Flag[]): Flag[][] {
    const flagMap = resourceIds.reduce(
      (acc, resourceId) => {
        acc[resourceId] = [];
        return acc;
      },
      {} as Record<string, Flag[]>,
    );

    flag.forEach((flag) => {
      if (flag.resourceIds && Array.isArray(flag.resourceIds)) {
        flag.resourceIds.forEach((resourceId) => {
          if (flagMap[resourceId]) {
            flagMap[resourceId].push(flag);
          }
        });
      }
    });

    return resourceIds.map((resourceId) => flagMap[resourceId]);
  }
}
