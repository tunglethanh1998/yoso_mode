import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({ url: process.env.DATABASE_URL });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Prisma Client connected using the PostgreSQL Driver Adapter.');
  }
  async onModuleDestroy() {
    await this.$disconnect();
    console.log(
      'Prisma Client disconnected using the PostgreSQL Driver Adapter.',
    );
  }
}
