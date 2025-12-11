import { Global, Module } from '@nestjs/common';

import { PrismaService } from './services/prisma.service';
import { ApiConfigService } from './services/api-config.service';

@Global()
@Module({
  providers: [ApiConfigService, PrismaService],
  exports: [ApiConfigService, PrismaService],
})
export class SharedModule {}
