import {
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn,
  PrimaryColumn,
} from 'typeorm';
import { RoleEnum } from '../dto/user.dto';

@Entity({ name: 'users' })
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

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

  @Column()
  createdBy: {
    _id: ObjectId;
    email: string;
  };

  @Column()
  updatedBy: {
    _id: ObjectId;
    email: string;
  };

  @Column()
  deletedBy: {
    _id: ObjectId;
    email: string;
  };

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  isDeleted: boolean;

  @Column()
  deletedAt: Date;
}
