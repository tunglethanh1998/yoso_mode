import { Global, Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ApiConfigService } from 'src/libs/services/api-config.service';

@Global()
@Module({
  providers: [ApiConfigService],
  imports: [ConfigModule],
  exports: [ApiConfigService],
})
export class SharedModule {}
