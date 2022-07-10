import { Controller, Post, Body, NotFoundException, UnauthorizedException, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { AuthService } from 'src/shared/auth/auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Public } from 'src/shared/custom-decorators/is-public.decorator';
import { Result } from 'src/shared/utils/result';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { LoginContract } from './contracts/login.contract';

@Controller('login')
export class LoginController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Public()
  @Post('authenticate')
  @UseInterceptors(new ValidatorInterceptor(new LoginContract()))
  async authenticate(@Body() model: AuthenticateDto): Promise<Result> {
    const user: User = await this.userService.authenticate(model.email, model.password);

    if (!user || !user.active)
      throw new HttpException(new Result(false, {}, [{ message: "User Not Found!" }], 401), HttpStatus.UNAUTHORIZED)

    const token = await this.authService.createToken(user.id, [user.roles]);
    return new Result(true, { token: token })
  }
}
