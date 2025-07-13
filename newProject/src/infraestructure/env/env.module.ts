import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './env.service';
import { envSchema } from './utils/envSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
