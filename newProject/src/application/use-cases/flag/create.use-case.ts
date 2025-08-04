import { Injectable } from '@nestjs/common';
import { FlagRepository } from 'src/application/contracts/flag.repository';
import { Flag } from 'src/domain/flag';

interface CreateFlagUseCaseProps {
  name: string;
}
@Injectable()
export class CreateFlagUseCase {
  constructor(private readonly flagRepository: FlagRepository) {}

  async execute(query: CreateFlagUseCaseProps): Promise<Flag> {
    const { name } = query;

    const flagResponse = await this.flagRepository.create({
      name,
    });
    return flagResponse;
  }
}
