import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';
import { AppModule } from '../src/app.module';
import mockData from './utils/mockData';

describe('HouseController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    connection = getConnection();
    await connection.synchronize(true);

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(mockData.signup);
    mockData.token1 = res.body.data?.access_token;
  });

  afterAll(async () => {
    await connection.synchronize(true);
    await app.close();
  });

  it(`/POST Authenticated User should be able to post a house`, async () => {
    const res = await request(app.getHttpServer())
      .post('/houses/')
      .set('Authorization', 'Bearer ' + mockData.token1)
      .send(mockData.house);
    return expect(res.status).toEqual(201);
  });

  it(`/GET Authenticated User should be able to view all available houses`, async () => {
    const res = await request(app.getHttpServer())
      .get('/houses?target=all')
      .set('Authorization', 'Bearer ' + mockData.token1);
    return expect(res.status).toEqual(200);
  });

  it(`/GET Authenticated User should be able to view HIS/HER houses`, async () => {
    const res = await request(app.getHttpServer())
      .get('/houses?target=mine')
      .set('Authorization', 'Bearer ' + mockData.token1);
    return expect(res.status).toEqual(200);
  });
});
