import { Test, TestingModule } from '@nestjs/testing';
import mockdata from '../../test/mockdata';
import { BidController } from './bid.controller';
import { BidService } from './bid.service';

describe('Bid Controller', () => {
  let bidController: BidController;
  let testingModule: TestingModule;
  let spyService: BidService;
  const user = {
    id: 'uuid',
    firstName: 'Mistico',
    lastName: 'Clement',
    email: 'misticoclement@gmail.com',
    phone: 780285767,
  };

  const houseId = 'uuid';
  const bidId = 'uuid';

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      controllers: [BidController],
      providers: [
        {
          provide: BidService,
          useFactory: () => ({
            createBid: jest.fn(() => true),
            getAll: jest.fn(() => true),
            getOne: jest.fn(() => true),
            approve: jest.fn(() => true),
            reject: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    bidController = testingModule.get<BidController>(BidController);
    spyService = testingModule.get(BidService);
  });

  it('should be defined', () => {
    expect(bidController).toBeDefined();
  });

  it('Should bid to the house', async () => {
    bidController.create(mockdata.bid, user, houseId);
    expect(spyService.createBid).toHaveBeenCalledWith(
      mockdata.bid,
      user,
      houseId,
    );
  });

  it('Should get all bids of a house', async () => {
    bidController.getBids(user, houseId);
    expect(spyService.getAll).toHaveBeenCalledWith(user, houseId);
  });

  it('Should get a specific house', async () => {
    bidController.getBid(user, houseId, bidId);
    expect(spyService.getOne).toHaveBeenCalledWith(user, houseId, bidId);
  });

  it('Owner should be able to approve a bid', async () => {
    bidController.approveBid(user, houseId, bidId);
    expect(spyService.approve).toHaveBeenCalledWith(user, houseId, bidId);
  });

  it('Should be able to reject a bid', async () => {
    bidController.rejectBid(user, houseId, bidId);
    expect(spyService.reject).toHaveBeenCalledWith(user, houseId, bidId);
  });
});
