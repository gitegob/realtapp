import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';
import { AppModule } from '../src/app.module';
import mockData from './utils/mockData';
import env from '../src/env';

describe('AuthController (e2e)', () => {
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
    return;
  });
  afterAll(async () => {
    await connection.synchronize(true);
    await app.close();
  });
  it(`/POST signup`, async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(mockData.signup);
    expect(res.status).toEqual(201);
    mockData.verLink = res.body.data.split(`${env.SERVER_URL}/api`)[1];
    return;
  });

  it(`/GET should confirm a user`, async () => {
    const res = await request(app.getHttpServer()).get(`${mockData.verLink}`);
    expect(res.status).toEqual(200);
    return;
  });
  it(`/POST login`, async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockData.login);
    expect(res.status).toEqual(200);
    return;
  });
});
