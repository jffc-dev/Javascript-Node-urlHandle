import { Injectable } from '@nestjs/common';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Resource } from 'src/domain/resource';

interface GetResourceUseCaseProps {
  id: number;
}
@Injectable()
export class GetResourceUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(query: GetResourceUseCaseProps): Promise<Resource> {
    const { id } = query;

    const resourceResponse = await this.resourceRepository.get(id);
    return resourceResponse;
  }
}
