import { BaseEntity } from '@/modules/base/entity/base.entity';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { RoleEnum } from '../dto/user.dto';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

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

  @Column()
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
