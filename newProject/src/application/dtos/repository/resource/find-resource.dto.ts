import { ResourceStatus } from 'generated/prisma';

export interface FindResourceRepositoryDto {
  page: number;
  limit: number;
  filter: FindResourceRepositoryFilter;
}

interface FindResourceRepositoryFilter {
  status: ResourceStatus[];
  participantIds: number[];
  flagIds: number[];
}
