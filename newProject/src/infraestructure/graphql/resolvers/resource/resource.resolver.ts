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
import { ListResourcesInputDto } from '../../dto/input/resource/list.input.dto';
import { CreateResourceInput } from 'src/application/dtos/requests/resource/create-resource.input';
import { CreateResourceUseCase } from 'src/application/use-cases/resource/create.use-case';
import { Flag } from '../../entities/flag.entity';
import { FlagsByResourceLoader } from 'src/infraestructure/common/dataloaders/flags-by-resource.loader';
import { GetResourceInputDto } from '../../dto/input/resource/get.dto';
import { GetResourceUseCase } from 'src/application/use-cases/resource/get-resource.use-case';
import { UpdateResourceInput } from 'src/application/dtos/requests/resource/update-resource.input';
import { UpdateResourceUseCase } from 'src/application/use-cases/resource/update.use-case';
import { GetRandomResourceInputDto } from '../../dto/input/resource/get-random.dto';
import { GetRandomResourceUseCase } from 'src/application/use-cases/resource/get-random.use-case';
import { GetRandomResourceOutputDto } from '../../dto/output/resource/get-random.output';
import { LoadTitleInputDto } from '../../dto/input/resource/load';
import { LoadTitleUseCase } from 'src/application/use-cases/resource/load-title.use-case';

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
    private readonly getRandomResourceUseCase: GetRandomResourceUseCase,
    private readonly loadTitleUseCase: LoadTitleUseCase,
    private readonly createResourceUseCase: CreateResourceUseCase,
    private readonly updateResourceUseCase: UpdateResourceUseCase,
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

  @Query(() => GetRandomResourceOutputDto, { name: 'getRandomResources' })
  getRandom(@Args('input') input: GetRandomResourceInputDto) {
    return this.getRandomResourceUseCase.execute(input);
  }

  @Query(() => String, { name: 'loadTitle' })
  loadTitle(@Args('input') input: LoadTitleInputDto) {
    return this.loadTitleUseCase.execute(input);
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
    const participants = await this.flagsByResourceLoader.load(resource.id);
    return participants.map((flag) => Flag.fromDomainToEntity(flag));
  }

  @Mutation(() => Resource, { name: 'createResource' })
  async create(@Args('data') data: CreateResourceInput): Promise<Resource> {
    const { url, title, status, participantIds, flagIds } = data;
    const resource = await this.createResourceUseCase.execute({
      url,
      title,
      status,
      participantIds,
      flagIds,
    });
    return Resource.fromDomainToEntity(resource);
  }

  @Mutation(() => Resource, { name: 'updateResource' })
  async update(@Args('data') data: UpdateResourceInput): Promise<Resource> {
    const { id, url, title, status, participantIds, flagIds } = data;
    const resource = await this.updateResourceUseCase.execute({
      id,
      url,
      title,
      status,
      participantIds,
      flagIds,
    });

    this.participantsByResourceLoader.clear(id);
    this.flagsByResourceLoader.clear(id);

    return Resource.fromDomainToEntity(resource);
  }
}
