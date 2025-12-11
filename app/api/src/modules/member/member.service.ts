import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/libs/services/prisma.service';
import { ApiConfigService } from 'src/libs/services/api-config.service';
import { MemberCreateDto, MemberLoginDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class MemberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ApiConfigService,
  ) {}

  async createMember(props: MemberCreateDto) {
    const { email, name, password } = props;

    const hashedPassword = await bcrypt.hash(password, 10);

    const member = await this.prisma.member.create({
      data: { email, name, password: hashedPassword },
    });

    return { id: member.id, email: member.email, name: member.name };
  }

  async login(props: MemberLoginDto) {
    const { email, password } = props;

    const member = await this.prisma.member.findFirst({
      where: { email },
    });

    if (!member) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, member.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.generateJwtToken(member);

    return { token };
  }

  private generateJwtToken(member: any): string {
    const payload = { id: member.id, email: member.email };
    const secret = this.configService.memberJWTSecret;
    const expiresIn = this.configService.memberJWTExpiresIn;

    return jwt.sign(payload, secret, { expiresIn });
  }
}
