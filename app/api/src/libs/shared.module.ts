import { Global, Module } from '@nestjs/common';

import { ApiConfigService } from 'src/libs/services/api-config.service';
import { PrismaService } from './services/prisma.service';

@Global()
@Module({
  providers: [ApiConfigService, PrismaService],
  exports: [ApiConfigService, PrismaService],
})
export class SharedModule {}
