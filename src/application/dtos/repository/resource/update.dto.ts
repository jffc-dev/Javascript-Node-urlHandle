import { ResourceStatus } from 'generated/prisma';

export interface UpdateResourceRepositoryDto {
  id: number;
  url: string;
  title: string;
  status: ResourceStatus;
}
