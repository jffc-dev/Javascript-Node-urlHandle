import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Participant } from '../../entities/participant.entity';
import { CreateParticipantInput } from 'src/application/dtos/requests/create-participant.input';
import { ListParticipantsUseCase } from 'src/application/use-cases/participant/list.use-case';
import { CreateParticipantUseCase } from 'src/application/use-cases/participant/create.use-case';
import { Resource } from '../../entities/resource.entity';
import { ResourcesByParticipantLoader } from 'src/infraestructure/common/dataloaders/resources-by-participant.loader';

@UsePipes(
  new ValidationPipe({
    transform: true,
  }),
)
@Resolver(() => Participant)
export class ParticipantResolver {
  constructor(
    private readonly createParticipantUseCase: CreateParticipantUseCase,
    private readonly listParticipantsUseCase: ListParticipantsUseCase,

    private readonly resourceByParticipantLoader: ResourcesByParticipantLoader,
  ) {}

  @Query(() => [Participant], { name: 'listParticipants' })
  list() {
    return this.listParticipantsUseCase.execute({});
  }

  @Mutation(() => Participant, { name: 'createParticipant' })
  async create(
    @Args('data') data: CreateParticipantInput,
  ): Promise<Participant> {
    const { name } = data;
    const cartDetail = await this.createParticipantUseCase.execute({
      name,
    });
    return Participant.fromDomainToEntity(cartDetail);
  }

  @ResolveField(() => [Resource], { name: 'resources' })
  async resources(@Parent() participant: Participant): Promise<Resource[]> {
    const resources = await this.resourceByParticipantLoader.load(
      participant.id,
    );
    return resources.map((resource) => Resource.fromDomainToEntity(resource));
  }
}
