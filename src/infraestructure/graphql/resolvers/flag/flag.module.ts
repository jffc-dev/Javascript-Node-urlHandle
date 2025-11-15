import { Module } from '@nestjs/common';
import { FlagResolver } from './flag.resolver';
import { ListFlagsUseCase } from 'src/application/use-cases/flag/list.use-case';
import { EnvModule } from 'src/infraestructure/env/env.module';
import { CreateFlagUseCase } from 'src/application/use-cases/flag/create.use-case';
import { UpdateFlagUseCase } from 'src/application/use-cases/flag/update.use-case';
import { GetResourcesByFlagIdsUseCase } from 'src/application/use-cases/resource/get-by-flag.use-case';
import { ResourcesByFlagLoader } from 'src/infraestructure/common/dataloaders/resources-by-flag.loader';

@Module({
  providers: [
    FlagResolver,
    ListFlagsUseCase,
    CreateFlagUseCase,
    GetResourcesByFlagIdsUseCase,
    UpdateFlagUseCase,

    ResourcesByFlagLoader,
  ],
  imports: [EnvModule],
})
export class FlagModule {}
