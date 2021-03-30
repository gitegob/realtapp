import { Test, TestingModule } from '@nestjs/testing';
import mockdata from '../../test/mockData';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';

describe('House Controller', () => {
  let houseController: HouseController;
  let testingModule: TestingModule;
  let spyService: HouseService;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [HouseController],
      providers: [
        {
          provide: HouseService,
          useFactory: () => ({
            create: jest.fn(() => true),
            findAll: jest.fn(() => true),
            findOne: jest.fn(() => true),
            update: jest.fn(() => true),
            delete: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    houseController = testingModule.get<HouseController>(HouseController);
    spyService = testingModule.get(HouseService);
  });

  it('should be defined', () => {
    expect(houseController).toBeDefined();
  });

  it('Should post a house', async () => {
    const user = {
      id: 'uid',
      firstName: 'John',
    };
    houseController.create(mockdata.house, [], user);
    expect(spyService.create).toHaveBeenCalledWith(user, mockdata.house, []);
  });

  it('Should update a house', async () => {
    const req = {
      user: {
        id: 'uid',
        firstName: 'John',
      },
    };
    houseController.update(mockdata.houseId1, mockdata.house, req, []);
    expect(spyService.update).toHaveBeenCalledWith(
      mockdata.houseId1,
      mockdata.house,
      req,
      [],
    );
  });

  it('Should find available houses', async () => {
    const user = {
      id: 'uid',
      firstName: 'John',
    };
    const routes = {
      target: 'all',
    };
    houseController.findAll(user, routes);
    expect(spyService.findAll).toHaveBeenCalled();
  });

  it('Should get a specific house', async () => {
    const houseId = 'uuid';
    houseController.findOne(houseId);
    expect(spyService.findOne).toHaveBeenCalledWith({
      where: { id: houseId },
      relations: ['owner'],
    });
  });

  it('Should be able to delete', async () => {
    const houseId = 'uuid';
    houseController.delete(houseId, mockdata.signup);
    expect(spyService.delete).toHaveBeenCalled();
  });
});
