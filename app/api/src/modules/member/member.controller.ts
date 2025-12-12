import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { MemberService } from './member.service';
import {
  MemberCreateDto,
  MemberCreateRespDto,
  MemberLoginDto,
  MemberLoginRespDto,
} from './dto/login-dto';
import { ApiConfigService } from 'src/libs/services/api-config.service';
import type { Response } from 'express';

@Controller('members')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly configService: ApiConfigService,
  ) {}

  @ApiBody({
    type: MemberCreateDto,
  })
  @ApiResponse({
    type: MemberCreateRespDto,
  })
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() props: MemberCreateDto) {
    const { id, email, name } = await this.memberService.createMember(props);

    return { id, email, name };
  }

  @ApiBody({
    type: MemberLoginDto,
  })
  @ApiResponse({
    type: MemberLoginRespDto,
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() props: MemberLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = props;

    const { token } = await this.memberService.login({ email, password });

    const domain = this.configService.cookieSessionDomain;
    const secure = this.configService.cookieSessionSecure;
    const sameSite = this.configService.cookieSessionSameSite;

    res.cookie(this.configService.cookieSessionName, token, {
      httpOnly: true,
      secure,
      sameSite: sameSite as 'lax' | 'strict' | 'none',
      maxAge: this.configService.cookieSessionMaxAge,
      domain,
    });

    return {
      accessToken: token,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    const cookieName = this.configService.cookieSessionName;
    const domain = this.configService.cookieSessionDomain;

    res.clearCookie(cookieName, {
      domain,
      path: '/',
    });

    return { message: 'Logout successfully' };
  }
}
