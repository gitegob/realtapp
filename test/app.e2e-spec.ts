import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/welcome (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/welcome');
    expect(res.status).toEqual(200);
    return;
  });

  afterAll(async () => {
    await app.close();
  });
});
