import { Flag } from 'src/domain/flag';
import { ListFlagsRepositoryDto } from '../dtos/repository/flag/list.dto';
import { CreateFlagRepositoryDto } from '../dtos/repository/flag/create-participants.dto';
import { UpdateFlagRepositoryDto } from '../dtos/repository/flag/update-participants.dto';
import { FindByIdsFlagRepositoryDto } from '../dtos/repository/flag/find-by-ids.dto';
import { FindByResourceIdsRepositoryDto } from '../dtos/repository/participant/find-by-resource-ids.dto';

export abstract class FlagRepository {
  abstract list(query: ListFlagsRepositoryDto): Promise<Flag[]>;
  abstract create(input: CreateFlagRepositoryDto): Promise<Flag>;
  abstract update(input: UpdateFlagRepositoryDto): Promise<Flag>;
  abstract findByIds(query: FindByIdsFlagRepositoryDto): Promise<Flag[]>;
  abstract findByResourceIds(
    query: FindByResourceIdsRepositoryDto,
  ): Promise<Flag[]>;

  abstract handleDBError(error: any): void;
}
