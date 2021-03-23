import { User } from './../src/auth/entities/auth.entity';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import mockData from './utils/mockData';
import { House } from '../src/house/entities/house.entity';
import { Bid } from '../src/bid/entities/bid.entity';

describe('BidController (e2e)', () => {
  let app: INestApplication;
  let userRepo: Repository<User>;
  let houseRepo: Repository<House>;
  let bidRepo: Repository<Bid>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    userRepo = moduleRef.get('UserRepository');
    houseRepo = moduleRef.get('HouseRepository');
    bidRepo = moduleRef.get('BidRepository');

    await bidRepo.query('delete from bids');
    await houseRepo.query('delete from houses');
    await userRepo.query('delete from users');

    const res1 = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(mockData.signup);
    mockData.token1 = res1.body.data.access_token;
    const res2 = await request(app.getHttpServer())
      .post('/houses')
      .set('Authorization', 'Bearer ' + mockData.token1)
      .send(mockData.house);
    mockData.houseId1 = res2.body.data.id;
  });
  afterAll(async () => {
    await bidRepo.query('delete from bids');
    await houseRepo.query('delete from houses');
    await userRepo.query('delete from users');
    await app.close();
  });
  it(`/POST create bid`, async () => {
    const res = await request(app.getHttpServer())
      .post(`/houses/${mockData.houseId1}/bids`)
      .set('Authorization', 'Bearer ' + mockData.token1)
      .send(mockData.bid);
    expect(res.status).toEqual(201);
    return;
  });
});
