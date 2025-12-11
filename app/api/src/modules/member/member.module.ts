import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { JwtModule } from '@nestjs/jwt';
import { ApiConfigService } from '../../libs/services/api-config.service';
import { SharedModule } from 'src/libs/shared.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => {
        return {
          secret: configService.memberJWTSecret,
          signOptions: {
            expiresIn: configService.memberJWTExpiresIn,
          },
        };
      },
      inject: [ApiConfigService],
    }),
    SharedModule,
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
