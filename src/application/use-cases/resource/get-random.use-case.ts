import { Injectable } from '@nestjs/common';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { GetRandomResourceOutputDto } from 'src/infraestructure/graphql/dto/output/resource/get-random.output';

interface GetRandomResourceUseCaseProps {
  size: number;
  initialIds?: number[];
}
@Injectable()
export class GetRandomResourceUseCase {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async execute(
    query: GetRandomResourceUseCaseProps,
  ): Promise<GetRandomResourceOutputDto> {
    const { size, initialIds = [] } = query;
    const actualSize = size - initialIds.length;

    const resourceIds = await this.resourceRepository.getRandom({
      size: actualSize,
      initialIds,
    });

    const operationIds = [...initialIds, ...resourceIds];
    const resourceResponse =
      await this.resourceRepository.findByResourceIds(operationIds);
    return {
      ids: operationIds,
      resources: resourceResponse,
    };
  }
}
