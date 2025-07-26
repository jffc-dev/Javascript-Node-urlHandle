import { Participant } from 'src/domain/participant';
import { ListParticipantsRepositoryDto } from '../dtos/repository/list-participants.dto';
import { CreateParticipantRepositoryDto } from '../dtos/repository/create-participants.dto';

export abstract class ParticipantRepository {
  abstract list(query: ListParticipantsRepositoryDto): Promise<Participant[]>;
  abstract create(input: CreateParticipantRepositoryDto): Promise<Participant>;

  abstract handleDBError(error: any): void;
}
