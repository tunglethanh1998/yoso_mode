import { ApiProperty } from '@nestjs/swagger';

export class MemberLoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class MemberLoginRespDto {
  @ApiProperty()
  accessToken: string;
}
