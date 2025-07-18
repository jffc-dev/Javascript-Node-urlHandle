import { Controller, Get } from '@nestjs/common';
import { GetResourcesUseCase } from 'src/application/use-cases/resource/get-resources.use-case';

@Controller('api/resource')
export class ResourceController {
  constructor(private readonly getResourcesUseCase: GetResourcesUseCase) {}

  @Get()
  getAll() {
    return this.getResourcesUseCase.execute();
  }
}
