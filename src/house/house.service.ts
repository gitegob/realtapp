import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { House } from './entities/house.entity';
import { HouseRoutesDto } from './dto/house-routes.dto';
import { OwnerDto } from '../auth/dto/owner.dto';
import cloudUpload from '../utils/cloudUpload';

@Injectable()
export class HouseService {
  constructor(
    @InjectRepository(House)
    private houseRepo: Repository<House>, // private userService: AuthService,
  ) {}

  /**
   * Create a house for sale
   * @owner owner info
   * @params house info
   * @files entry images of a house
   * @return response
   */
  async create(user: any, createHouseDto: CreateHouseDto, files) {
    const pics = [];
    if (files && files.length) {
      for (const file of files) {
        const url = await cloudUpload(file.path);
        pics.push(url);
      }
    }
    createHouseDto.pictures = pics;
    const house: House = this.houseRepo.create({
      owner: user,
      ...createHouseDto,
    });
    const createdHouse = await this.houseRepo.save(house);
    delete createdHouse.owner.password;
    return { message: 'House successfully posted', data: createdHouse };
  }

  async findOne(options: any) {
    const house = await this.houseRepo.findOne(options);
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
    const houses = await this.houseRepo.find({
      where: conditions,
    });
    return { message: 'List of houses found', data: houses };
  }
}
