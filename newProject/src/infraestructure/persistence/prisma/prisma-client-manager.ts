import { ClsService } from 'nestjs-cls';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { MyClsStore, PRISMA_TX_CLIENT_KEY } from 'src/application/utils/cls';
import { Prisma } from 'generated/prisma';

@Injectable()
export class PrismaClientManager {
  constructor(
    private normalClient: PrismaService,
    private cls: ClsService<MyClsStore>,
  ) {}

  /**
   * This method is used to retrieve the prisma client in the repositories.
   *
   * If a transaction was initiated, the transaction client will be returned.
   *
   * If a transaction was not initiated, the normal prisma client will be returned.
   *
   * Notice that TransactionClient does not have all methods avaiable to the normal prisma client.
   * If you need methods not available in TransactionClient, it's necessary to check the instance of the returned client.
   * This should rarely be necessary when using the client in repositories.
   *
   * TransactionClient = Omit<PrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>
   */
  getClient(): Prisma.TransactionClient | PrismaService {
    const txClient = this.cls.get(PRISMA_TX_CLIENT_KEY);

    if (txClient) {
      return txClient;
    } else {
      return this.normalClient;
    }
  }
}
