import { Module } from '@nestjs/common';
import { HttpModule } from './infraestructure/http/http.module';
import { PersistenceModule } from './infraestructure/persistence/persistence.module';
import { GraphqlModule } from './infraestructure/graphql/graphql.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    HttpModule,
    GraphqlModule,
    PersistenceModule.register({
      global: true,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
