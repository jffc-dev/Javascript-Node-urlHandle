import { Module } from '@nestjs/common';
import { ResourceResolver } from './resource.resolver';
import { GetResourcesUseCase } from 'src/application/use-cases/resource/get-resources.use-case';
import { EnvModule } from 'src/infraestructure/env/env.module';
import { ParticipantsByResourceLoader } from 'src/infraestructure/common/dataloaders/participants-by-resource.loader';
import { GetParticipantsByResourceIdsUseCase } from 'src/application/use-cases/participant/get-by-resource.use-case';
import { CreateResourceUseCase } from 'src/application/use-cases/resource/create.use-case';
import { FlagsByResourceLoader } from 'src/infraestructure/common/dataloaders/flags-by-resource.loader';
import { GetFlagsByResourceIdsUseCase } from 'src/application/use-cases/flag/get-by-resource.use-case';
import { GetResourceUseCase } from 'src/application/use-cases/resource/get-resource.use-case';
import { UpdateResourceUseCase } from 'src/application/use-cases/resource/update.use-case';
import { GetRandomResourceUseCase } from 'src/application/use-cases/resource/get-random.use-case';
import { LoadTitleUseCase } from 'src/application/use-cases/resource/load-title.use-case';

@Module({
  providers: [
    ResourceResolver,
    GetResourcesUseCase,
    GetResourceUseCase,
    UpdateResourceUseCase,
    GetParticipantsByResourceIdsUseCase,
    CreateResourceUseCase,
    GetFlagsByResourceIdsUseCase,
    GetRandomResourceUseCase,
    LoadTitleUseCase,

    ParticipantsByResourceLoader,
    FlagsByResourceLoader,
  ],
  imports: [EnvModule],
})
export class ResourceModule {}
