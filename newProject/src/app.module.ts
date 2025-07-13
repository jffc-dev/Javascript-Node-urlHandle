import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './infraestructure/env/env.module';
import { HttpModule } from './infraestructure/http/http.module';

@Module({
  imports: [EnvModule, HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
