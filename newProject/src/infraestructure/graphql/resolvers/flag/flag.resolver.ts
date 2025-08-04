import { UsePipes, ValidationPipe } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Flag } from '../../entities/flag.entity';
import { ListFlagsUseCase } from 'src/application/use-cases/flag/list.use-case';
import { CreateFlagUseCase } from 'src/application/use-cases/flag/create.use-case';
import { Resource } from '../../entities/resource.entity';
import { UpdateFlagUseCase } from 'src/application/use-cases/flag/update.use-case';
import { ResourcesByFlagLoader } from 'src/infraestructure/common/dataloaders/resources-by-flag.loader';
import { CreateFlagInput } from 'src/application/dtos/requests/flag/create.input';
import { UpdateFlagInput } from 'src/application/dtos/requests/flag/update.input';

@UsePipes(
  new ValidationPipe({
    transform: true,
  }),
)
@Resolver(() => Flag)
export class FlagResolver {
  constructor(
    private readonly createFlagUseCase: CreateFlagUseCase,
    private readonly listFlagsUseCase: ListFlagsUseCase,
    private readonly updateFlagUseCase: UpdateFlagUseCase,

    private readonly resourceByFlagLoader: ResourcesByFlagLoader,
  ) {}

  @Query(() => [Flag], { name: 'listFlags' })
  list() {
    return this.listFlagsUseCase.execute({});
  }

  @Mutation(() => Flag, { name: 'createFlag' })
  async create(@Args('data') data: CreateFlagInput): Promise<Flag> {
    const { name } = data;
    const flag = await this.createFlagUseCase.execute({
      name,
    });
    return Flag.fromDomainToEntity(flag);
  }

  @Mutation(() => Flag, { name: 'updateFlag' })
  async update(@Args('data') data: UpdateFlagInput): Promise<Flag> {
    const { id, name } = data;
    const flag = await this.updateFlagUseCase.execute({
      id,
      name,
    });
    return Flag.fromDomainToEntity(flag);
  }

  @ResolveField(() => [Resource], { name: 'resources' })
  async resources(@Parent() flag: Flag): Promise<Resource[]> {
    const resources = await this.resourceByFlagLoader.load(flag.id);
    return resources.map((resource) => Resource.fromDomainToEntity(resource));
  }
}
