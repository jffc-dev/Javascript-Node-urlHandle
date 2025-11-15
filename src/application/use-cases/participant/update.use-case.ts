import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from 'src/application/contracts/participant.repository';
import { Participant } from 'src/domain/participant';

interface UpdateParticipantUseCaseProps {
  id: number;
  name?: string;
}
@Injectable()
export class UpdateParticipantUseCase {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  async execute(query: UpdateParticipantUseCaseProps): Promise<Participant> {
    const { id, name } = query;

    const participantResponse = await this.participantRepository.update({
      id,
      name,
    });
    return participantResponse;
  }
}
