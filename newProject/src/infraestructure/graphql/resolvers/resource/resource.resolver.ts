import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Resource } from '../../entities/resource.entity';
import { GetResourcesUseCase } from 'src/application/use-cases/resource/get-resources.use-case';
import { Participant } from '../../entities/participant.entity';
import { ParticipantsByResourceLoader } from 'src/infraestructure/common/dataloaders/participants-by-resource.loader';
import { ListResourcesInputDto } from '../../dto/resource/list.input.dto';
import { CreateResourceInput } from 'src/application/dtos/requests/resource/create-resource.input';
import { CreateResourceUseCase } from 'src/application/use-cases/resource/create.use-case';
import { Flag } from '../../entities/flag.entity';
import { FlagsByResourceLoader } from 'src/infraestructure/common/dataloaders/flags-by-resource.loader';
import { GetResourceInputDto } from '../../dto/resource/get.dto';
import { GetResourceUseCase } from 'src/application/use-cases/resource/get-resource.use-case';

@UsePipes(
  new ValidationPipe({
    transform: true,
  }),
)
@Resolver(() => Resource)
export class ResourceResolver {
  constructor(
    private readonly getResourcesUseCase: GetResourcesUseCase,
    private readonly getResourceUseCase: GetResourceUseCase,
    private readonly createResourceUseCase: CreateResourceUseCase,
    private readonly participantsByResourceLoader: ParticipantsByResourceLoader,
    private readonly flagsByResourceLoader: FlagsByResourceLoader,
  ) {}

  @Query(() => [Resource], { name: 'listResources' })
  list(@Args('input') input: ListResourcesInputDto) {
    return this.getResourcesUseCase.execute(input);
  }

  @Query(() => Resource, { name: 'getResource' })
  get(@Args('input') input: GetResourceInputDto) {
    return this.getResourceUseCase.execute(input);
  }

  @ResolveField(() => [Participant], { name: 'participants' })
  async participants(@Parent() resource: Resource): Promise<Participant[]> {
    const participants = await this.participantsByResourceLoader.load(
      resource.id,
    );
    return participants.map((participant) =>
      Participant.fromDomainToEntity(participant),
    );
  }

  @ResolveField(() => [Flag], { name: 'flags' })
  async flags(@Parent() resource: Resource): Promise<Flag[]> {
    console.log(resource.id);
    const participants = await this.flagsByResourceLoader.load(resource.id);
    return participants.map((flag) => Flag.fromDomainToEntity(flag));
  }

  @Mutation(() => Resource, { name: 'createResource' })
  async create(@Args('data') data: CreateResourceInput): Promise<Resource> {
    const { url, title, parentId, status, participantIds, flagIds } = data;
    const resource = await this.createResourceUseCase.execute({
      url,
      title,
      parentId,
      status,
      participantIds,
      flagIds,
    });
    return Resource.fromDomainToEntity(resource);
  }
}
