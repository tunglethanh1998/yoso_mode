import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  // Req,
  // Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
// import { Request, Response } from 'express';
import { MemberService } from './member.service';
import { ApiConfigService } from 'src/libs/services/api-config.service';
import { MemberLoginDto, MemberLoginRespDto } from './dto/login-dto';

@Controller('members')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly configService: ApiConfigService,
  ) {}

  @ApiBody({
    type: MemberLoginDto,
  })
  @ApiResponse({
    type: MemberLoginRespDto,
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() data: MemberLoginDto,
    // @Req() req: Request,
    // @Res() res: Response,
  ) {
    // const member = await this.memberService.login(data.username, data.password);

    // const domain = this.configService.get<string>('COOKIE_SESSION_DOMAIN');
    // const secure = this.configService.get<boolean>('COOKIE_SESSION_SECURE');
    // const sameSite = this.configService.get<'lax' | 'strict' | 'none'>(
    //   'COOKIE_SESSION_SAMESITE',
    // );

    // res.cookie(this.configService.get('COOKIE_SESSION_NAME'), sessionId, {
    //   httpOnly: this.configService.get<boolean>('COOKIE_SESSION_HTTPONLY'),
    //   secure,
    //   sameSite,
    //   maxAge: this.configService.get<number>('COOKIE_SESSION_MAXAGE'),
    //   domain,
    // });

    return {
      // sessionId,
    };
  }
}
