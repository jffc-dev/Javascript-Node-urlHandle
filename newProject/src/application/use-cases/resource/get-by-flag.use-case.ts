import { Injectable } from '@nestjs/common';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Resource } from 'src/domain/resource';

interface GetResourcesByFlagIdsUseCaseProps {
  page?: number;
  limit?: number;
  flagIds: number[];
}
@Injectable()
export class GetResourcesByFlagIdsUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(query: GetResourcesByFlagIdsUseCaseProps): Promise<Resource[]> {
    const { flagIds } = query;

    const resourceResponse = await this.resourceRepository.findByFlagIds({
      flagIds,
    });
    return resourceResponse;
  }
}
