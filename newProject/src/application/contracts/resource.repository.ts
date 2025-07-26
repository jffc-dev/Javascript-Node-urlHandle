import { Resource } from 'src/domain/resource';
import { FindResourceRepositoryDto } from '../dtos/repository/find-resource.dto';

export abstract class ResourceRepository {
  abstract find(query: FindResourceRepositoryDto): Promise<Resource[]>;

  abstract handleDBError(error: any): void;
}
