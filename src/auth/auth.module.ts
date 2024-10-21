import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';
import { DatabaseAbstractModule } from '../database-abstract/database-abstract.module';
import { DatabaseTypeEnum } from '../database-abstract/types/enums/database-type.enum';

@Module({
  imports: [JwtModule.register({}), ConfigModule, UsersModule, DatabaseAbstractModule.register(DatabaseTypeEnum.MONGODB)],
  controllers: [AuthController],
  providers: [AuthService, UsersService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {
}
