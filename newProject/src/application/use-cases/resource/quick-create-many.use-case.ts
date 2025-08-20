import { Injectable } from '@nestjs/common';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { TransactionManager } from 'src/application/contracts/transaction-manager';

interface QuickCreateResourcesUseCaseProps {
  urls: string[];
}
@Injectable()
export class QuickCreateResourcesUseCase {
  constructor(
    private readonly resourceRepository: ResourceRepository,
    private transactionManager: TransactionManager,
  ) {}

  async execute(query: QuickCreateResourcesUseCaseProps): Promise<number> {
    const { urls } = query;

    return await this.transactionManager.run(async () => {
      const resourceResponse = await this.resourceRepository.createMany({
        urls,
      });

      return resourceResponse;
    });
  }
}
