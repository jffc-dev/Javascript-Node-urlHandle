import { Resource } from 'src/domain/resource';
import { FindResourceRepositoryDto } from '../dtos/repository/resource/find-resource.dto';
import { FindByParticipantIdsRepositoryDto } from '../dtos/repository/resource/find-by-participant-ids.dto';
import { CreateResourceRepositoryDto } from '../dtos/repository/resource/create.dto';
import { SetParticipantsRepositoryDto } from '../dtos/repository/resource/set-participants.dto';
import { SetFlagsRepositoryDto } from '../dtos/repository/resource/set-flags.dto';
import { FindByFlagIdsRepositoryDto } from '../dtos/repository/resource/find-by-flag-ids.dto';

export abstract class ResourceRepository {
  abstract find(query: FindResourceRepositoryDto): Promise<Resource[]>;
  abstract get(id: number): Promise<Resource>;
  abstract findByParticipantIds(
    query: FindByParticipantIdsRepositoryDto,
  ): Promise<Resource[]>;
  abstract findByFlagIds(
    query: FindByFlagIdsRepositoryDto,
  ): Promise<Resource[]>;
  abstract create(input: CreateResourceRepositoryDto): Promise<Resource>;
  abstract setParticipants(
    input: SetParticipantsRepositoryDto,
  ): Promise<Resource | null>;
  abstract setFlags(input: SetFlagsRepositoryDto): Promise<Resource | null>;

  abstract handleDBError(error: any): void;
}
