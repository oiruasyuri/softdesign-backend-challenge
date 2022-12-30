import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.verifyUserIsValid(email, password);

    if (!user) {
      throw new UnauthorizedException(
        'Provavelmente você digitou seu email ou sua senha de forma incorreta',
      );
    }

    return user._doc;
  }
}
