import { Injectable } from '@nestjs/common';
import { EnvService } from './infraestructure/env/env.service';

@Injectable()
export class AppService {
  constructor(private readonly envService: EnvService) {}

  getHello(): string {
    return `Hello World! ${this.envService.get('PORT')}`;
  }
}
