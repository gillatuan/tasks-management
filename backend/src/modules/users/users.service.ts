import { setHashPassword } from '@/helpers/utils';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FilterDto, RegisterInput } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async isEmailExist(email: string) {
    const isExist = await this.userRepository.findOneBy({ email });

    if (isExist) {
      return true;
    }

    return false;
  }

  async register(registerInput: RegisterInput): Promise<User> {
    const { email } = registerInput;

    // check exist email
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(
        `Email da ton tai: ${email}. Hay su dung email khac`,
      );
    }

    const hashedPassword = await setHashPassword(registerInput.password);
    const newUser = this.userRepository.create({
      ...registerInput,
      id: uuid(),
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  /* async login(input: LoginInput): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email: input.email } });
    if (!user || !(await bcrypt.compare(input.password, user.password))) {
      throw new Error('Invalid credentials');
    }
    // Generate a JWT token
    return jwt.sign({ userId: user.id }, 'your_secret_key');
  } */

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async searchTerms(filterDto: FilterDto) {
    const { isActive, s } = filterDto;

    if (isActive) {
      return await this.userRepository.findBy({ isActive });
    }

    if (s) {
      return await this.userRepository.find({
        where: { email: {
          $in: Like(`%${s}%`)
        } as any },
      });
    }

    return await this.userRepository.find();
  }
}
