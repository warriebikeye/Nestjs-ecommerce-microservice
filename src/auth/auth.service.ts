// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {
    // Setup email transporter (e.g., Gmail)
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // 1. Signup - Create user, send verification code
  async signup(email: string, password: string, fullName: string): Promise<string> {
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      fullName,
      password: hashedPassword,
      isVerified: false,
    });

    // Generate a verification code (JWT converted to alphanumeric)
    const verificationCode = this.generateVerificationCode();
    const expiryTime = Date.now() + 60000; // 1 minute expiry

    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = expiryTime;
    await user.save();

    // Send the verification code to the user's email
    await this.sendVerificationEmail(email, verificationCode);

    return 'Verification code sent to your email. Please check your inbox.';
  }

  // 2. Login - Validate user credentials and send a JWT
  async login(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new Error('Please verify your email first');
    }

    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  // 3. Verify the code passed by the user
  async verifyCode(email: string, code: string): Promise<string> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.verificationCode !== code) {
      throw new Error('Invalid verification code');
    }

    if (Date.now() > user.verificationCodeExpiry) {
      throw new Error('Verification code has expired');
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpiry = undefined;
    await user.save();

    return 'User successfully verified';
  }

  // Helper function to generate a 6-7 character alphanumeric code
  private generateVerificationCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let verificationCode = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      verificationCode += characters[randomIndex];
    }
    return verificationCode;
  }

  // Send the verification code via email
  private async sendVerificationEmail(email: string, verificationCode: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Please use the following verification code to verify your email: \n\n${verificationCode}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
