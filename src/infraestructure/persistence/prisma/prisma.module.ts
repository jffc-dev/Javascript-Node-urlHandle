import { Module } from '@nestjs/common';
import { EnvModule } from 'src/infraestructure/env/env.module';
import { PrismaService } from './prisma.service';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { PrismaResourceRepository } from './repositories/prisma-resource.repository';
import { ParticipantRepository } from 'src/application/contracts/participant.repository';
import { PrismaParticipantRepository } from './repositories/prisma-participant.repository';
import { TransactionManager } from 'src/application/contracts/transaction-manager';
import { PrismaTransactionManager } from './prisma-transaction-manager';
import { PrismaClientManager } from './prisma-client-manager';
import { FlagRepository } from 'src/application/contracts/flag.repository';
import { PrismaFlagRepository } from './repositories/prisma-flag.repository';

@Module({
  imports: [EnvModule],
  providers: [
    PrismaService,
    PrismaClientManager,
    {
      provide: ResourceRepository,
      useClass: PrismaResourceRepository,
    },
    {
      provide: ParticipantRepository,
      useClass: PrismaParticipantRepository,
    },
    {
      provide: FlagRepository,
      useClass: PrismaFlagRepository,
    },
    { provide: TransactionManager, useClass: PrismaTransactionManager },
  ],
  exports: [
    ResourceRepository,
    ParticipantRepository,
    FlagRepository,
    TransactionManager,
    PrismaService,
  ],
})
export class PrismaModule {}
