import { ApiProperty } from '@nestjs/swagger';

export class MemberLoginDto {
  @ApiProperty({ default: 'thanhtung@gmail.com' })
  email: string;

  @ApiProperty({ default: '123123123dAA@' })
  password: string;
}

export class MemberLoginRespDto {
  @ApiProperty()
  accessToken: string;
}

export class MemberCreateDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;
}

export class MemberCreateRespDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}
