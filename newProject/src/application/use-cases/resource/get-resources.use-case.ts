import { Injectable } from '@nestjs/common';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Resource } from 'src/domain/resource';
import { EnvService } from 'src/infraestructure/env/env.service';

interface GetResourcesUseCaseProps {
  page?: number;
  limit?: number;
}
@Injectable()
export class GetResourcesUseCase {
  constructor(
    private readonly resourceRepository: ResourceRepository,
    private readonly envService: EnvService,
  ) {}

  async execute(query: GetResourcesUseCaseProps): Promise<Resource[]> {
    const { page = 1, limit = this.envService.get('DEFAULT_PAGE_SIZE') } =
      query;

    const resourceResponse = await this.resourceRepository.find({
      page,
      limit,
      filter: { active: true },
    });
    return resourceResponse;
  }
}
