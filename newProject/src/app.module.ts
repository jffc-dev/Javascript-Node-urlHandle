import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './infraestructure/env/env.module';
import { HttpModule } from './infraestructure/http/http.module';
import { PersistenceModule } from './infraestructure/persistence/persistence.module';

@Module({
  imports: [
    EnvModule,
    HttpModule,
    PersistenceModule.register({
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
