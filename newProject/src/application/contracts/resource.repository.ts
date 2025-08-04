import { Resource } from 'src/domain/resource';
import { FindResourceRepositoryDto } from '../dtos/repository/resource/find-resource.dto';
import { FindByParticipantIdsRepositoryDto } from '../dtos/repository/resource/find-by-participant-ids.dto';
import { CreateResourceRepositoryDto } from '../dtos/repository/resource/create.dto';

export abstract class ResourceRepository {
  abstract find(query: FindResourceRepositoryDto): Promise<Resource[]>;
  abstract findByParticipantIds(
    query: FindByParticipantIdsRepositoryDto,
  ): Promise<Resource[]>;
  abstract create(input: CreateResourceRepositoryDto): Promise<Resource>;

  abstract handleDBError(error: any): void;
}
