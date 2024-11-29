import { Column, ObjectId, PrimaryColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn()
  id: string; // Sau này sẽ dùng với class-transformer để serialize dữ liệu response

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

  @Column({ default: null })
  deleted_at: Date; // Dùng cho soft delete
}
