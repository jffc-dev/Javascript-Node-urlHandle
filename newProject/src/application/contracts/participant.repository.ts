import { Participant } from 'src/domain/participant';
import { ListParticipantsRepositoryDto } from '../dtos/repository/list-participants.dto';
import { CreateParticipantRepositoryDto } from '../dtos/repository/create-participants.dto';
import { FindByIdsParticipantDto } from '../dtos/repository/participant/find-by-ids.dto';
import { FindByResourceIdsRepositoryDto } from '../dtos/repository/participant/find-by-resource-ids.dto';
import { UpdateParticipantRepositoryDto } from '../dtos/repository/participant/create-participants.dto copy';

export abstract class ParticipantRepository {
  abstract list(query: ListParticipantsRepositoryDto): Promise<Participant[]>;
  abstract create(input: CreateParticipantRepositoryDto): Promise<Participant>;
  abstract update(input: UpdateParticipantRepositoryDto): Promise<Participant>;
  abstract findByIds(query: FindByIdsParticipantDto): Promise<Participant[]>;
  abstract findByResourceIds(
    query: FindByResourceIdsRepositoryDto,
  ): Promise<Participant[]>;

  abstract handleDBError(error: any): void;
}
