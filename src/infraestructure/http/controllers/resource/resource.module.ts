import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { GetResourcesUseCase } from 'src/application/use-cases/resource/get-resources.use-case';
import { EnvModule } from 'src/infraestructure/env/env.module';

@Module({
  providers: [GetResourcesUseCase],
  controllers: [ResourceController],
  imports: [EnvModule],
})
export class ResourceHttpModule {}
