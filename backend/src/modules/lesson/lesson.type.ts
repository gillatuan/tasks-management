import { ObjectType, Field, ID } from '@nestjs/graphql';
import { StudentType } from '@/modules/student/student.type';

@ObjectType()
export class LessonType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(type => [StudentType])
  students: string[];
}