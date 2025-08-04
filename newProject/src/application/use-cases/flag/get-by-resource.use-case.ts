import { Injectable } from '@nestjs/common';
import { FlagRepository } from 'src/application/contracts/flag.repository';
import { Flag } from 'src/domain/flag';

interface GetFlagsByResourceIdsUseCaseProps {
  page?: number;
  limit?: number;
  resourceIds: number[];
}
@Injectable()
export class GetFlagsByResourceIdsUseCase {
  constructor(private readonly flagRepository: FlagRepository) {}

  async execute(query: GetFlagsByResourceIdsUseCaseProps): Promise<Flag[]> {
    const { resourceIds } = query;

    const resourceResponse = await this.flagRepository.findByResourceIds({
      resourceIds,
    });
    return resourceResponse;
  }
}
