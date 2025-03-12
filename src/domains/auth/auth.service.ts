import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "@users/users.service";
import { LoginDTO } from "@auth/dtos/LoginDTO";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(LoginDTO: LoginDTO) {
    const user = await this.usersService.findOneByEmail(LoginDTO.email);
    if (!user) {
      throw new UnauthorizedException("User not found or password invalid");
    }

    const isPasswordValid = await bcrypt.compare(
      LoginDTO.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("User not found or password invalid");
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type.id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
