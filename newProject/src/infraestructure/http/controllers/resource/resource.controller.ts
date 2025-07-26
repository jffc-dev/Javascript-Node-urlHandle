import { Query } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { GetResourcesQueryDto } from 'src/application/dtos/requests/get-resources-query.dto';
import { GetResourcesUseCase } from 'src/application/use-cases/resource/get-resources.use-case';

@Controller('api/resources')
export class ResourceController {
  constructor(private readonly getResourcesUseCase: GetResourcesUseCase) {}

  @Get()
  getAll(@Query() query: GetResourcesQueryDto) {
    return this.getResourcesUseCase.execute(query);
  }
}
