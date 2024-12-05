import { BaseEntity } from '@/modules/base/entity/base.entity';
import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  apiPath: string;

  @Column()
  method: string;

  @Column()
  module: string;
}
