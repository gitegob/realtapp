import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  Connection,
  createConnection,
  getConnection,
  Repository,
} from 'typeorm';
import { AppModule } from '../src/app.module';
import mockData from './utils/mockData';

describe('BidController (e2e)', () => {
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

    const res1 = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(mockData.signup);
    mockData.token1 = res1.body.data.access_token;
    const res2 = await request(app.getHttpServer())
      .post('/houses')
      .set('Authorization', `Bearer ${mockData.token1}`)
      .send(mockData.house);
    mockData.houseId1 = res2.body.data.id;
  });
  afterAll(async () => {
    await connection.synchronize(true);
    await app.close();
  });
  it(`/POST create bid`, async () => {
    const res = await request(app.getHttpServer())
      .post(`/houses/${mockData.houseId1}/bids`)
      .set('Authorization', `Bearer ${mockData.token1}`)
      .send(mockData.bid);
    expect(res.status).toEqual(201);
    mockData.bidId1 = res.body.data.id;
    return;
  });
  it(`/GET Get all bids on a house`, async () => {
    const res = await request(app.getHttpServer())
      .get(`/houses/${mockData.houseId1}/bids`)
      .set('Authorization', `Bearer ${mockData.token1}`);
    expect(res.status).toEqual(200);
    return;
  });
  it(`/GET Get a single bid on a house`, async () => {
    const res = await request(app.getHttpServer())
      .get(`/houses/${mockData.houseId1}/bids/${mockData.bidId1}`)
      .set('Authorization', `Bearer ${mockData.token1}`);
    expect(res.status).toEqual(200);
    return;
  });
  it(`/GET Get all bids by a user`, async () => {
    const res = await request(app.getHttpServer())
      .get('/auth/bids')
      .set('Authorization', `Bearer ${mockData.token1}`);
    expect(res.status).toEqual(200);
    return;
  });
  it(`/GET Get a single bid by a user`, async () => {
    const res = await request(app.getHttpServer())
      .get(`/auth/bids/${mockData.bidId1}`)
      .set('Authorization', `Bearer ${mockData.token1}`);
    expect(res.status).toEqual(200);
    return;
  });
  it(`/PATCH Approve a single bid on a house`, async () => {
    const res = await request(app.getHttpServer())
      .patch(`/houses/${mockData.houseId1}/bids/${mockData.bidId1}/approve`)
      .set('Authorization', `Bearer ${mockData.token1}`);
    expect(res.status).toEqual(200);
    return;
  });
  it(`/POST create another bid`, async () => {
    const res = await request(app.getHttpServer())
      .post(`/houses/${mockData.houseId1}/bids`)
      .set('Authorization', `Bearer ${mockData.token1}`)
      .send(mockData.bid);
    expect(res.status).toEqual(201);
    mockData.bidId2 = res.body.data.id;
    return;
  });
  it(`/PATCH Reject a single bid on a house`, async () => {
    const res = await request(app.getHttpServer())
      .patch(`/houses/${mockData.houseId1}/bids/${mockData.bidId2}/reject`)
      .set('Authorization', `Bearer ${mockData.token1}`);
    expect(res.status).toEqual(200);
    return;
  });
  it(`/POST create another bid`, async () => {
    const res = await request(app.getHttpServer())
      .post(`/houses/${mockData.houseId1}/bids`)
      .set('Authorization', `Bearer ${mockData.token1}`)
      .send(mockData.bid);
    expect(res.status).toEqual(201);
    mockData.bidId2 = res.body.data.id;
    return;
  });
  it(`/DELETE user should cancel a bid`, async () => {
    const res = await request(app.getHttpServer())
      .delete(`/auth/bids/${mockData.bidId2}`)
      .set('Authorization', `Bearer ${mockData.token1}`);
    expect(res.status).toEqual(200);
    return;
  });
});
