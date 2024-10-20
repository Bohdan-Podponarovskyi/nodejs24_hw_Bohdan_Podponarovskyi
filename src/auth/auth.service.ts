import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { SignInUserInputDto } from './dto/sign-in-user-input.dto';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpUserResponseDto } from './dto/sign-up-user-response.dto';
import { CreateUserInputDto } from '../users/dto/create-user-input.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async signIn(signInUserInputDto: SignInUserInputDto) {

    const { email, password } = signInUserInputDto;

    this.logger.log(`Signing in user: ${email}`);

    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new BadRequestException('User does not exist');

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    const tokens = await this.getTokens(user._id, email);

    await this.updateRefreshToken(user._id, tokens.refreshToken);

    return tokens;
  }

  async signUp(body: CreateUserInputDto): Promise<SignUpUserResponseDto> {
    const { firstName, lastName, isStudent, age, email, password } = body;

    this.logger.log(`Signing up user: ${email}`);

    const user = await this.usersService.findOneByEmailWithoutException(email);

    this.logger.log(user);

    if (user) throw new BadRequestException(`User with ${email} already exist`);

    const hashedPassword = await this.hashData(password);

    const newUser = await this.usersService.create({
      firstName,
      lastName,
      age,
      isStudent,
      email,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser._id, email);

    await this.updateRefreshToken(newUser._id, tokens.refreshToken);

    this.logger.log(`User with email: ${email} successfully signed up`);

    return tokens;
  }

  async signOut(userId: string) {
    return this.usersService.findOneAndUpdate(userId, { refreshToken: null });
  }

  async getTokens(userId: string, email: string) {
    this.logger.log(`Generate tokens for user: ${userId}, ${email}`);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
        }
      )
    ])

    await this.usersService.findOneAndUpdate(userId, {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    return {
      accessToken,
      refreshToken
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.usersService.findOneAndUpdate(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    this.logger.log(`Updating tokens for user: ${userId}`);

    const user = await this.usersService.findOneById(userId);

    if (!user || !user.refreshToken) throw new ForbiddenException('Access denied');

    const isRefreshTokenValid = await argon2.verify(user.refreshToken, refreshToken);

    if (!isRefreshTokenValid) throw new ForbiddenException('Access denied: Invalid refresh token');

    const tokens = await this.getTokens(user._id, user.email);

    await this.updateRefreshToken(user._id, tokens.refreshToken);

    return tokens;
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
