import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { OwnerDto } from '../auth/dto/owner.dto';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { House } from './entities/house.entity';
import { HouseRoutesDto } from './dto/house-routes.dto';

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
  /**
   * Get one house
   * @id id of the house'
   * @return response
   */
  async findOne(id: string) {
    const house = await this.HouseRepo.findOne(id);
    if (!house)
      throw new NotFoundException(
        'Sorry, That House is not found. Kindly try with another.',
      );
    return house;
  }

  /**
   * Get house posts
   * @req user info
   * @enum target type
   * @return response
   */
  async findAll({ id }: OwnerDto, { target }: HouseRoutesDto) {
    const conditions = target === 'mine' ? { owner: id } : {};
    const houses = await this.HouseRepo.find({
      where: conditions,
    });
    return { message: 'List of houses found', data: houses };
  }
}
