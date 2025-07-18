import { Injectable } from '@nestjs/common';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Resource } from 'src/domain/resource';

@Injectable()
export class GetResourcesUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(): Promise<Resource[]> {
    const resourceResponse = await this.resourceRepository.getResources();
    return resourceResponse;
  }
}
