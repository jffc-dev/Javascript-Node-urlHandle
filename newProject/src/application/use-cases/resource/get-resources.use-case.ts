import { Injectable } from '@nestjs/common';
import { ResourceStatus } from 'generated/prisma';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Resource } from 'src/domain/resource';
import { EnvService } from 'src/infraestructure/env/env.service';

interface GetResourcesUseCaseProps {
  page?: number;
  limit?: number;
  status?: ResourceStatus[];
}
@Injectable()
export class GetResourcesUseCase {
  constructor(
    private readonly resourceRepository: ResourceRepository,
    private readonly envService: EnvService,
  ) {}

  async execute(query: GetResourcesUseCaseProps): Promise<Resource[]> {
    const {
      page = 1,
      limit = this.envService.get('DEFAULT_PAGE_SIZE'),
      status = ['APPROVED'],
    } = query;

    const resourceResponse = await this.resourceRepository.find({
      page,
      limit,
      filter: { status },
    });
    return resourceResponse;
  }
}
