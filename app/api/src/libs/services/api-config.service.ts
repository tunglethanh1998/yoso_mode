import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  private getEnv(key: string) {
    const value = this.configService.get<string>(key);

    if (value === null || value === undefined) {
      throw new Error(key + ' environment variable does not set');
    }

    return value;
  }

  get nodeEnv(): string {
    return this.getEnv('NODE_ENV');
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isTest(): boolean {
    return this.nodeEnv === 'test';
  }

  get memberJWTSecret(): string {
    return this.getEnv('MEMBER_JWT_SECRET');
  }

  get memberJWTExpiresIn(): number {
    return 7200; // 2h
  }

  get databaseUrl(): string {
    return this.getEnv('DATABASE_URL');
  }
}
