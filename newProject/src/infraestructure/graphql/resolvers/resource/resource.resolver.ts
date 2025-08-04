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

@UsePipes(
  new ValidationPipe({
    transform: true,
  }),
)
@Resolver(() => Resource)
export class ResourceResolver {
  constructor(
    private readonly getResourcesUseCase: GetResourcesUseCase,
    private readonly createResourceUseCase: CreateResourceUseCase,
    private readonly participantsByResourceLoader: ParticipantsByResourceLoader,
  ) {}

  @Query(() => [Resource], { name: 'listResources' })
  list(@Args('input') input: ListResourcesInputDto) {
    return this.getResourcesUseCase.execute(input);
  }

  @ResolveField(() => [Participant], { name: 'participants' })
  async participants(@Parent() resource: Resource): Promise<Participant[]> {
    const participants = await this.participantsByResourceLoader.load(
      resource.id,
    );
    return participants.map((resource) =>
      Participant.fromDomainToEntity(resource),
    );
  }

  @Mutation(() => Resource, { name: 'createResource' })
  async create(@Args('data') data: CreateResourceInput): Promise<Resource> {
    const { url, title, parentId, status } = data;
    const resource = await this.createResourceUseCase.execute({
      url,
      title,
      parentId,
      status,
    });
    return Resource.fromDomainToEntity(resource);
  }
}
