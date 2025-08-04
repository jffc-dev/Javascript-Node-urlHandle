import { Injectable } from '@nestjs/common';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Resource } from 'src/domain/resource';

interface GetRandomResourceUseCaseProps {
  size: number;
}
@Injectable()
export class GetRandomResourceUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(query: GetRandomResourceUseCaseProps): Promise<Resource[]> {
    const { size } = query;

    const resourceIds = await this.resourceRepository.getRandom(size);
    const resourceResponse =
      await this.resourceRepository.findByResourceIds(resourceIds);
    return resourceResponse;
  }
}
