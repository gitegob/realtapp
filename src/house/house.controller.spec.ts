import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HouseRepositoryFake } from '../../test/utils/HouseRepositoryFake';
import { House } from './entities/house.entity';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';

describe('HouseController', () => {
  let houseController: HouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: getRepositoryToken(House),
          useClass: HouseRepositoryFake,
        },
      ],
    }).compile();

    houseController = module.get<HouseController>(HouseController);
    // houseRepo = module.get(getRepositoryToken(House));
  });

  it('should be defined', () => {
    expect(houseController).toBeDefined();
  });
});
