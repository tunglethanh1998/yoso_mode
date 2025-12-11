import { Module } from '@nestjs/common';
import { MemberModule } from './modules/member/member.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './libs/shared.module';
import { TestModule } from './modules/test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    MemberModule,
    TestModule,
  ],
})
export class AppModule {}
