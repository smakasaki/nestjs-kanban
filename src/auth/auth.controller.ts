import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() request, @Body() dto: LoginDto) {
    const user = await this.authService.validateUser(
      dto.username,
      dto.password,
    );
    if (user) {
      request.session.userId = user._id;
      return { message: 'Logged in successfully', userId: user._id };
    } else {
      throw new BadRequestException('Invalid credentials');
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() request) {
    return {
      userId: request.session.userId,
    };
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Req() request) {
    request.session.destroy();
    return 'Logged out';
  }
}
