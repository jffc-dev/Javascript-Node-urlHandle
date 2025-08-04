import { Prisma } from 'generated/prisma';
import { ClsStore } from 'nestjs-cls';

export const PRISMA_TX_CLIENT_KEY = 'PRISMA_TX_CLIENT_KEY';

export interface MyClsStore extends ClsStore {
  [PRISMA_TX_CLIENT_KEY]?: Prisma.TransactionClient;
}
