import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/libs/services/prisma.service';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  async login(email: string) {
    const member = await this.prisma.member.findFirst({
      where: {
        email,
      },
    });
    if (!member) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
