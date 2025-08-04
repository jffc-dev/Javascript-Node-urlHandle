import { ResourceStatus } from 'generated/prisma';

export interface CreateResourceRepositoryDto {
  url: string;
  title: string;
  parentId?: number;
  status?: ResourceStatus;
}
