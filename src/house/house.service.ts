import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { OwnerDto } from '../auth/dto/owner.dto';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { House } from './entities/house.entity';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private HouseRepo: Repository<House>,
    private userService: AuthService,
  ) {}

  /**
   * Create a house for sale
   * @owner owner info
   * @createHouseDto house info
   * @files entry images of a house
   * @return response
   */
  async create({ id }: OwnerDto, createHouseDto: CreateHouseDto, files) {
    const owner: OwnerDto = await this.userService.findOne({
      where: { id },
    });
    createHouseDto.pictures = files
      ? files.map(({ path: filePath }) => filePath)
      : [];
    const house: House = this.HouseRepo.create({ owner, ...createHouseDto });
    const createdHouse = await this.HouseRepo.save(house);
    delete createdHouse.owner.password;
    return { message: 'House successfully posted', data: createdHouse };
  }

  async findOne(id: string) {
    const house = await this.HouseRepo.findOne(id);
    if (!house)
      throw new NotFoundException(
        'Sorry, That House is not found. Kindly try with another.',
      );
    return house;
  }
}
