import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { ALREADY_REGISTRY_ERROR } from "./auth.constants";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.authService.findUser(dto.login);

    if (!oldUser) {
      return this.authService.createUser(dto);
    } else {
      throw new BadRequestException(ALREADY_REGISTRY_ERROR);
    }
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {

  }
}
