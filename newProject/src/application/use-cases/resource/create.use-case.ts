import { Injectable } from '@nestjs/common';
import { ResourceStatus } from 'generated/prisma';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { TransactionManager } from 'src/application/contracts/transaction-manager';
import { Resource } from 'src/domain/resource';

interface CreateResourceUseCaseProps {
  title: string;
  url: string;
  status?: ResourceStatus;
  participantIds?: number[];
  flagIds?: number[];
}
@Injectable()
export class CreateResourceUseCase {
  constructor(
    private readonly resourceRepository: ResourceRepository,
    private transactionManager: TransactionManager,
  ) {}

  async execute(query: CreateResourceUseCaseProps): Promise<Resource> {
    const { title, url, status, participantIds = [], flagIds = [] } = query;

    return await this.transactionManager.run(async () => {
      const resourceResponse = await this.resourceRepository.create({
        title,
        url,
        status,
      });

      const resourceParticipants =
        await this.resourceRepository.setParticipants({
          id: resourceResponse.id,
          participantds: participantIds.map((id) => ({ id })),
        });

      if (resourceParticipants) {
        resourceResponse.participantIds = resourceParticipants.participantIds;
        resourceResponse.participants = resourceParticipants.participants;
      }

      const resourceFlags = await this.resourceRepository.setFlags({
        id: resourceResponse.id,
        flagIds: flagIds.map((id) => ({ id })),
      });

      if (resourceFlags) {
        resourceResponse.flagIds = resourceFlags.flagIds;
        resourceResponse.flags = resourceFlags.flags;
      }

      return resourceResponse;
    });
  }
}
