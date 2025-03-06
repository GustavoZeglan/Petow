import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { LoginDTO } from '@auth/dtos/LoginDTO';
import { JoiPipe } from 'nestjs-joi';
import { AuthService } from '@auth/auth.service';
import { HttpResponseDTO } from '@architecture/dtos/HttpResponseDTO';
import { Public } from '@architecture/decorators/public';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  @Public()
  async login(
    @Body(JoiPipe) loginDTO: LoginDTO,
  ) {
    const token = await this.authService.login(loginDTO);
    return new HttpResponseDTO(HttpStatus.OK, 'Login successful', token);
  }

}
