import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from 'src/application/contracts/participant.repository';
import { Participant } from 'src/domain/participant';
import { EnvService } from 'src/infraestructure/env/env.service';

interface ListParticipantsUseCaseProps {
  page?: number;
  limit?: number;
}
@Injectable()
export class ListParticipantsUseCase {
  constructor(
    private readonly participantRepository: ParticipantRepository,
    private readonly envService: EnvService,
  ) {}

  async execute(query: ListParticipantsUseCaseProps): Promise<Participant[]> {
    const { page = 1, limit = this.envService.get('DEFAULT_PAGE_SIZE') } =
      query;

    const participantResponse = await this.participantRepository.list({
      page,
      limit,
    });
    return participantResponse;
  }
}
