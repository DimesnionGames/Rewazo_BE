import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/service/auth.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { rdsConfig } from './common/utils/config/rds.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `src/config/envs/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: rdsConfig.host,
      port: rdsConfig.port ? +rdsConfig.port : undefined,
      username: rdsConfig.username,
      password: rdsConfig.password,
      database: rdsConfig.database,
      autoLoadEntities: true,
      extra: {
        synchronizeViews: true,
      }
    }),
    AuthModule],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
