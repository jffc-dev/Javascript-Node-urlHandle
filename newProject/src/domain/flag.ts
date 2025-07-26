import { Resource } from './resource';

export class Flag {
  id: number;
  uuid: string;
  name: string;
  resourceFlags: Resource[];
  createdAt: Date;
  updatedAt: Date;
}
