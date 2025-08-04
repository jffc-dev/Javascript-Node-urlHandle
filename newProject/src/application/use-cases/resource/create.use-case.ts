import { Injectable } from '@nestjs/common';
import { ResourceStatus } from 'generated/prisma';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { Resource } from 'src/domain/resource';

interface CreateResourceUseCaseProps {
  title: string;
  url: string;
  parentId?: number;
  status?: ResourceStatus;
}
@Injectable()
export class CreateResourceUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(query: CreateResourceUseCaseProps): Promise<Resource> {
    const { title, url, parentId, status } = query;

    const resourceResponse = await this.resourceRepository.create({
      title,
      url,
      parentId,
      status,
    });
    return resourceResponse;
  }
}
