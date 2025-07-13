import { Module } from '@nestjs/common';
import { ResourceHttpModule } from './controllers/resource/resource.module';

@Module({
  controllers: [],
  imports: [ResourceHttpModule],
  exports: [],
})
export class HttpModule {}
