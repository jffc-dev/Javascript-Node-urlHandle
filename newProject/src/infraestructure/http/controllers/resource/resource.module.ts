import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { GetResourcesUseCase } from 'src/application/use-cases/resource/get-resources.use-case';

@Module({
  providers: [GetResourcesUseCase],
  controllers: [ResourceController],
  imports: [],
})
export class ResourceHttpModule {}
