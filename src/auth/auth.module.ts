import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { GoogleStrategy } from './utils/google.strategy';
import { AuthService } from './service/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleIdTokenStrategy } from './utils/google-id-token.strategy';
import { JwtStrategy } from './utils/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    GoogleIdTokenStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
