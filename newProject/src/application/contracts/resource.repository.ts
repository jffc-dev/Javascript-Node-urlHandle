import { Resource } from 'src/domain/resource';

export abstract class ResourceRepository {
  abstract getResources(): Promise<Resource[]>;

  abstract handleDBError(error: any): void;
}
