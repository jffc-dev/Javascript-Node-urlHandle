import { Injectable } from '@nestjs/common';
import { FlagRepository } from 'src/application/contracts/flag.repository';
import { Flag } from 'src/domain/flag';
import { EnvService } from 'src/infraestructure/env/env.service';

interface ListFlagsUseCaseProps {
  page?: number;
  limit?: number;
}
@Injectable()
export class ListFlagsUseCase {
  constructor(
    private readonly flagRepository: FlagRepository,
    private readonly envService: EnvService,
  ) {}

  async execute(query: ListFlagsUseCaseProps): Promise<Flag[]> {
    const { page = 1, limit = this.envService.get('DEFAULT_PAGE_SIZE') } =
      query;

    const flagResponse = await this.flagRepository.list({
      page,
      limit,
    });
    return flagResponse;
  }
}
