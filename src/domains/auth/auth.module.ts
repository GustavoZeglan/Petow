import { Module } from '@nestjs/common';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { UsersModule } from '@users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@architecture/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
