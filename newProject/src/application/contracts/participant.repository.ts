import { Participant } from 'src/domain/participant';
import { ListParticipantsRepositoryDto } from '../dtos/repository/list-participants.dto';
import { CreateParticipantRepositoryDto } from '../dtos/repository/create-participants.dto';
import { FindByIdsParticipantDto } from '../dtos/repository/participant/find-by-ids.dto';

export abstract class ParticipantRepository {
  abstract list(query: ListParticipantsRepositoryDto): Promise<Participant[]>;
  abstract create(input: CreateParticipantRepositoryDto): Promise<Participant>;
  abstract findByIds(query: FindByIdsParticipantDto): Promise<Participant[]>;

  abstract handleDBError(error: any): void;
}
