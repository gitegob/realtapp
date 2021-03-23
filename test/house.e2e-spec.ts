import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import mockData from './utils/mockData';
import { House } from '../src/house/entities/house.entity';
import { User } from '../src/auth/entities/auth.entity';

describe('Houses', () => {
  let app: INestApplication;
  let houseRepo: Repository<House>;
  let userRepo: Repository<User>;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    houseRepo = moduleRef.get('HouseRepository');
    await houseRepo.query('delete from houses');

    userRepo = moduleRef.get('UserRepository');
    await userRepo.query('delete from users');

    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(mockData.signup);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockData.login);
    mockData.token1 = res.body.data?.access_token;
  });
  afterAll(async () => {
    await houseRepo.query('delete from houses');
    await userRepo.query('delete from users');
    await app.close();
  });
  it(`/POST houses`, async () => {
    const res = await request(app.getHttpServer())
      .post('/houses/')
      .set('Authorization', 'Bearer ' + mockData.token1)
      .send(mockData.house);
    return expect(res.status).toEqual(201);
  });
});
