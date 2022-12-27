import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async verifyUserIsValid(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUnique(email);

    if (user && user.password === password) {
      const { password, ...userDetails } = user;

      return userDetails;
    }

    return null;
  }

  async authenticate(user: any) {
    const payload = { sub: user._id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
