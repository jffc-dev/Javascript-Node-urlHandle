import { ResourceStatus } from 'generated/prisma';

export interface FindResourceRepositoryDto {
  page: number;
  limit: number;
  filter: FindResourceRepositoryFilter;
}

interface FindResourceRepositoryFilter {
  statuses: ResourceStatus[];
  participantIds: number[];
  flagIds: number[];
  urlTitle: string;
}
