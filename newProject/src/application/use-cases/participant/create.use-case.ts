import { Injectable } from '@nestjs/common';
import { ParticipantRepository } from 'src/application/contracts/participant.repository';
import { Participant } from 'src/domain/participant';

interface CreateParticipantUseCaseProps {
  name: string;
}
@Injectable()
export class CreateParticipantUseCase {
  constructor(private readonly participantRepository: ParticipantRepository) {}

  async execute(query: CreateParticipantUseCaseProps): Promise<Participant> {
    const { name } = query;

    const participantResponse = await this.participantRepository.create({
      name,
    });
    return participantResponse;
  }
}
