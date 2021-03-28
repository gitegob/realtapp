import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HouseRepositoryFake } from '../../test/utils/HouseRepositoryFake';
import { House } from './entities/house.entity';
import { HouseService } from './house.service';

describe('HouseService', () => {
  let houseService: HouseService;
  let houseRepo: Repository<House>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: getRepositoryToken(House),
          useValue: HouseRepositoryFake,
        },
      ],
    }).compile();

    houseService = module.get<HouseService>(HouseService);
    houseRepo = module.get(getRepositoryToken(House));
  });

  it('should be defined', () => {
    expect(houseService).toBeDefined();
  });
});
