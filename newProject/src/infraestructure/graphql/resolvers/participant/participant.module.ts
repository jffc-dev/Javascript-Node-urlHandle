import { Module } from '@nestjs/common';
import { ParticipantResolver } from './participant.resolver';
import { ListParticipantsUseCase } from 'src/application/use-cases/participant/list.use-case';
import { EnvModule } from 'src/infraestructure/env/env.module';
import { CreateParticipantUseCase } from 'src/application/use-cases/participant/create.use-case';

@Module({
  providers: [
    ParticipantResolver,
    ListParticipantsUseCase,
    CreateParticipantUseCase,
  ],
  imports: [EnvModule],
})
export class ParticipantModule {}
