import { ClsService } from 'nestjs-cls';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { MyClsStore, PRISMA_TX_CLIENT_KEY } from 'src/application/utils/cls';
import { TransactionManager } from 'src/application/contracts/transaction-manager';

@Injectable()
export class PrismaTransactionManager implements TransactionManager {
  constructor(
    private prisma: PrismaService,
    private cls: ClsService<MyClsStore>,
  ) {}

  /**
   * This method is used to run a callback inside a transaction.
   *
   * If this method is called recursively, all operations will share the same transaction.
   *
   * @param cb  The callback to be executed inside the transaction
   * @returns The return value of the callback
   * @throws Any exception thrown by the callback. Rollback is handled by Prisma.
   */
  async run<T>(cb: () => Promise<T>): Promise<T> {
    // Reuse the same Transaction Client if `run` is called inside an on-going transaction
    if (this.cls.has(PRISMA_TX_CLIENT_KEY)) return cb();

    try {
      // Create a Prisma transaction
      // `return await` is necessary for the `finally` block to be executed only after the transaction finishes
      return await this.prisma.$transaction((prisma) => {
        // Save the Transaction Client inside the CLS store to be retrieved by the repositories
        this.cls.set(PRISMA_TX_CLIENT_KEY, prisma);
        // Execute the callback and return its value
        return cb();
      });
    } finally {
      // Unset the Transaction Client from the CLS store after the transaction finishes (either by commit or rollback)
      this.cls.set(PRISMA_TX_CLIENT_KEY, undefined);
    }
  }
}
