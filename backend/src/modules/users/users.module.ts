import { Module } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { UsersResolver } from '@/modules/users/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
