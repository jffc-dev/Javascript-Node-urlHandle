import { Injectable } from '@nestjs/common';
import { Resource } from 'src/domain/resource';

interface IGetResourcesUseCaseProps {
  id: string;
}

@Injectable()
export class GetResourcesUseCase {
  constructor() {}

  execute({ id }: IGetResourcesUseCaseProps): Resource[] {
    console.log(id);
    return [] as Resource[];
  }
}
