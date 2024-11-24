import { RoleEnum } from '@/modules/users/dto/user.dto';
import { ObjectType } from '@nestjs/graphql';
import { Column, PrimaryColumn } from 'typeorm';

@ObjectType()
export class Auth {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  providerId?: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  avatar: string;

  @Column({ default: RoleEnum.Member })
  role: RoleEnum;

  @Column({ default: false })
  isActive?: boolean;

  @Column()
  codeId: string;

  @Column()
  codeExpired: Date;

  @Column()
  refreshToken: string;
}
