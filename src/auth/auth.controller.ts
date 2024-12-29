// src/auth/auth.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. Signup endpoint
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto); // Calls the signup method in the service
  }

  // 2. Verify endpoint
  @Post('verify')
  verify(@Body() body: { email: string; code: string }) {
    return this.authService.verifyCode(body.email, body.code); // Calls the verifyCode method in the service
  }
}
