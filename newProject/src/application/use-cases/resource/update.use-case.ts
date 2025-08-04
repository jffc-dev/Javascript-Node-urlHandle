import { Injectable } from '@nestjs/common';
import { ResourceStatus } from 'generated/prisma';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { TransactionManager } from 'src/application/contracts/transaction-manager';
import { Resource } from 'src/domain/resource';

interface UpdateResourceUseCaseProps {
  id: number;
  title: string;
  url: string;
  status: ResourceStatus;
  participantIds?: number[];
  flagIds?: number[];
}
@Injectable()
export class UpdateResourceUseCase {
  constructor(
    private readonly resourceRepository: ResourceRepository,
    private transactionManager: TransactionManager,
  ) {}

  async execute(query: UpdateResourceUseCaseProps): Promise<Resource> {
    const { title, url, status, participantIds = [], flagIds = [], id } = query;

    return await this.transactionManager.run(async () => {
      const resourceResponse = await this.resourceRepository.update({
        id,
        title,
        url,
        status,
      });
      console.log(participantIds, resourceResponse);
      const resourceParticipants =
        await this.resourceRepository.setParticipants({
          id: resourceResponse.id,
          participantds: participantIds.map((id) => ({ id })),
        });
      console.log(resourceParticipants);

      if (resourceParticipants) {
        resourceResponse.participantIds = resourceParticipants.participantIds;
      }

      const resourceFlags = await this.resourceRepository.setFlags({
        id: resourceResponse.id,
        flagIds: flagIds.map((id) => ({ id })),
      });

      console.log(resourceFlags);

      if (resourceFlags) {
        resourceResponse.flagIds = resourceFlags.flagIds;
      }
      console.log('resourceResponse', resourceResponse);
      return resourceResponse;
    });
  }
}
