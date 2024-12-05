import { Column, ObjectId, PrimaryColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn()
  id: string; // Sau này sẽ dùng với class-transformer để serialize dữ liệu response

  @Column()
  createdAt: Date;
  @Column()
  createdBy: {
    _id: ObjectId;
    email: string;
  };

  @Column()
  updatedAt: Date;
  @Column()
  updatedBy: {
    _id: ObjectId;
    email: string;
  };

  @Column()
  isDeleted: boolean;
  @Column()
  deletedBy: {
    _id: ObjectId;
    email: string;
  };
  @Column({ default: null })
  deletedAt: Date;
}
