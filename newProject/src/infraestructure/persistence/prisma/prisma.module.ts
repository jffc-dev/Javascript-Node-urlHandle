import { Module } from '@nestjs/common';
import { EnvModule } from 'src/infraestructure/env/env.module';
import { PrismaService } from './prisma.service';
import { ResourceRepository } from 'src/application/contracts/resource.repository';
import { PrismaResourceRepository } from './repositories/prisma-resource.repository';

@Module({
  imports: [EnvModule],
  providers: [
    PrismaService,
    {
      provide: ResourceRepository,
      useClass: PrismaResourceRepository,
    },
  ],
  exports: [ResourceRepository],
})
export class PrismaModule {}
