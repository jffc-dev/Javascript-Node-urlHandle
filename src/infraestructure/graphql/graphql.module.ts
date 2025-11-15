import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ParticipantModule } from './resolvers/participant/participant.module';
import { ResourceModule } from './resolvers/resource/resource.module';
import { FlagModule } from './resolvers/flag/flag.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      introspection: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const originalError = error.extensions?.originalError as any;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code,
          };
        }
        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          message: originalError.message,
          code: error.extensions?.code,
        };
      },
    }),
    ParticipantModule,
    ResourceModule,
    FlagModule,
  ],
  providers: [],
})
export class GraphqlModule {}
