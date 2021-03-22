import { User } from './../src/auth/entities/auth.entity';
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';

describe('Auth', () => {
  let app: INestApplication;
  let userRepo: Repository<User>;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    userRepo = moduleRef.get('UserRepository');
    await userRepo.query('delete from users');
  });
  afterAll(async () => {
    await userRepo.query('delete from users');
    await app.close();
  });
  it(`/POST signup`, async () => {
    const res = await request(app.getHttpServer()).post('/auth/signup').send({
      firstName: 'Brian',
      lastName: 'Gitego',
      email: 'test@test.com',
      password: 'Password',
      phone: '788555555',
    });
    expect(res.status).toEqual(201);
    return;
  });
});
