import { Module } from '@nestjs/common';
import { ParticipantResolver } from './participant.resolver';
import { ListParticipantsUseCase } from 'src/application/use-cases/participant/list.use-case';
import { EnvModule } from 'src/infraestructure/env/env.module';
import { CreateParticipantUseCase } from 'src/application/use-cases/participant/create.use-case';
import { ResourcesByParticipantLoader } from 'src/infraestructure/common/dataloaders/resources-by-participant.loader';
import { GetResourcesByParticipantIdsUseCase } from 'src/application/use-cases/resource/get-by-participant.use-case';

@Module({
  providers: [
    ParticipantResolver,
    ListParticipantsUseCase,
    CreateParticipantUseCase,
    GetResourcesByParticipantIdsUseCase,

    ResourcesByParticipantLoader,
  ],
  imports: [EnvModule],
})
export class ParticipantModule {}
