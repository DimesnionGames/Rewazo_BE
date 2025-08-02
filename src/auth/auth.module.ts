import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { GoogleStrategy } from './utils/google.strategy';

@Module({
  controllers: [AuthController],
  providers:[GoogleStrategy]
})
export class AuthModule {}
