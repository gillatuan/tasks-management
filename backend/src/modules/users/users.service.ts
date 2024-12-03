import { AuthRegisterInput } from '@/auth/dto/auth.dto';
import { paginate } from '@/helpers/pagination.util';
import { setHashPassword } from '@/helpers/utils';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import parseQuery from 'api-query-params';
import { isUUID } from 'class-validator';
import { MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UpdateUserInput } from './dto/update-user.input';
import { FilterDto, RoleEnum } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async isEmailExist(email: string) {
    const isExist = await this.userRepository.findOneBy({ email });

    if (isExist) {
      return true;
    }

    return false;
  }

  async register(authRegisterInput: AuthRegisterInput): Promise<User> {
    const { email } = authRegisterInput;

    // check exist email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email da ton tai: ${email}. Hay su dung email khac`,
      );
    }

    const hashedPassword = await setHashPassword(authRegisterInput.password);
    const newUser = this.userRepository.create({
      ...authRegisterInput,
      id: uuid(),
      password: hashedPassword,
      isActive: false,
      role: RoleEnum.Member,
    });
    return await this.userRepository.save(newUser);
  }

  updateUserToken = async (refreshToken: string, id: string) => {
    return await this.userRepository.updateOne(
      { id },
      { $set: { refreshToken } },
    );
  };

  async findAll(query: string, page: number = 1, limit: number = 10) {
    // Parse the query using api-query-params
    const { filter, sort, population, projection } = parseQuery(query);
    const offset = (+page - 1) * limit;

    const [data, total] = await this.userRepository.findAndCount({
      where: filter,
      skip: offset,
      take: limit,
      order: sort,
      select: {
        password: false,
        id: true,
        email: true,
        phone: true,
        address: true,
        avatar: true,
        role: true,
      },
    });

    return paginate(data, total, limit, offset);
  }

  /* async findAll(query: string): Promise<UserPaginationResponse> {
    return await paginate(this.userRepository, query)
  } */

  async findOne(id: string) {
    if (!isUUID(id)) {
      return `not found user`;
    }

    return await this.userRepository.findOneBy({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ where: { email } });
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput) {
    const checkExistUser = this.userRepository.findOneBy({ id });
    if (!checkExistUser) {
      throw new NotFoundException('Khong ton tai use nay');
    }
    const getHashPassword = await setHashPassword(updateUserInput.password);
    await this.userRepository.update(
      { id },
      { ...updateUserInput, password: getHashPassword },
    );

    return 'Update user OK';
  }

  async remove(id: string) {
    if (isUUID(id)) {
      const checkUserIsAdmin = await this.userRepository.findOneBy({
        id,
        role: RoleEnum.Admin,
      });
      if (!checkUserIsAdmin) {
        const idSlice = id.slice();
        this.userRepository.delete({ id });
        return idSlice;
      }

      throw new BadRequestException('Ban khong co quyen xoa');
    }
    throw new BadRequestException('Id ko dung dinh dang');
  }

  async searchTerms(filterDto: FilterDto) {
    const { isActive, s } = filterDto;

    if (isActive) {
      return await this.userRepository.findBy({ isActive });
    }

    if (s) {
      return await this.userRepository.find({
        where: {
          email: { $regex: new RegExp(s, 'i') }, // Case-insensitive substring match
        },
      });
    }

    return await this.userRepository.find();
  }
}
