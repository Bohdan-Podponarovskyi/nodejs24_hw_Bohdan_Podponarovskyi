import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { SignInUserInputDto } from './dto/sign-in-user-input.dto';
import { CreateUserInputDto } from '../users/dto/create-user-input.dto';
import { AccessTokenGuard } from '../guards/access-token/access-token.guard';
import { RefreshTokenGuard } from '../guards/refresh-token/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInUserInputDto: SignInUserInputDto) {
    return this.authService.signIn(signInUserInputDto);
  }

  @Post('sign-up')
  async signUp(@Body() createUserInputDto: CreateUserInputDto) {
    return this.authService.signUp(createUserInputDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('sign-out')
  async signOut(@Req() req: Request) {
    return this.authService.signOut(req.user['sub']);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refresh(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];

    return this.authService.refreshTokens(userId, refreshToken);
  }
}
