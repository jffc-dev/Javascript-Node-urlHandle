import { DynamicModule, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

interface DatabaseOptions {
  global?: boolean;
}

@Module({})
export class PersistenceModule {
  static register({ global = false }: DatabaseOptions): DynamicModule {
    return {
      global,
      module: PersistenceModule,
      imports: [PrismaModule],
      exports: [PrismaModule],
    };
  }
}
