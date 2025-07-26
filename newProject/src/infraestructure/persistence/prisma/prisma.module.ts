import { Module } from '@nestjs/common';
import { EnvModule } from 'src/infraestructure/env/env.module';
import { PrismaService } from './prisma.service';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { PrismaResourceRepository } from './repositories/prisma-resource.repository';
import { ParticipantRepository } from 'src/application/contracts/participant.repository';
import { PrismaParticipantRepository } from './repositories/prisma-participant.repository';

@Module({
  imports: [EnvModule],
  providers: [
    PrismaService,
    {
      provide: ResourceRepository,
      useClass: PrismaResourceRepository,
    },
    {
      provide: ParticipantRepository,
      useClass: PrismaParticipantRepository,
    },
  ],
  exports: [ResourceRepository, ParticipantRepository],
})
export class PrismaModule {}
