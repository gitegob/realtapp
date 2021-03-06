import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HouseRepositoryFake } from '../../test/utils/HouseRepositoryFake';
import { cloudServiceMock } from '../../test/utils/mocks/cloudinary.service';
import CloudinaryService from '../shared/providers/cloudinary.service';
import { House } from './entities/house.entity';
import { HouseService } from './house.service';

describe('HouseService', () => {
  let houseService: HouseService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseService,
        {
          provide: getRepositoryToken(House),
          useValue: HouseRepositoryFake,
        },
        {
          provide: CloudinaryService,
          useValue: cloudServiceMock,
        },
      ],
    }).compile();

    houseService = module.get<HouseService>(HouseService);
  });

  it('should be defined', () => {
    expect(houseService).toBeDefined();
  });
});
