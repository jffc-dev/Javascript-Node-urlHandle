import { Injectable } from '@nestjs/common';
import { FlagRepository } from 'src/application/contracts/flag.repository';
import { Flag } from 'src/domain/flag';

interface UpdateFlagUseCaseProps {
  id: number;
  name?: string;
}
@Injectable()
export class UpdateFlagUseCase {
  constructor(private readonly flagRepository: FlagRepository) {}

  async execute(query: UpdateFlagUseCaseProps): Promise<Flag> {
    const { id, name } = query;

    const flagResponse = await this.flagRepository.update({
      id,
      name,
    });
    return flagResponse;
  }
}
