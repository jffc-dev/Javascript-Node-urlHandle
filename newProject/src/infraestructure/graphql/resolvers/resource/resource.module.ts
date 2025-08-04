import { Module } from '@nestjs/common';
import { ResourceResolver } from './resource.resolver';
import { GetResourcesUseCase } from 'src/application/use-cases/resource/get-resources.use-case';
import { EnvModule } from 'src/infraestructure/env/env.module';
import { ParticipantsByResourceLoader } from 'src/infraestructure/common/dataloaders/participants-by-resource.loader';
import { GetParticipantsByResourceIdsUseCase } from 'src/application/use-cases/participant/get-by-resource.use-case';
import { CreateResourceUseCase } from 'src/application/use-cases/resource/create.use-case';

@Module({
  providers: [
    ResourceResolver,
    GetResourcesUseCase,
    GetParticipantsByResourceIdsUseCase,
    CreateResourceUseCase,

    ParticipantsByResourceLoader,
  ],
  imports: [EnvModule],
})
export class ResourceModule {}
