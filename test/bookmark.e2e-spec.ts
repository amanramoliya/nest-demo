import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Bookmark } from '@prisma/client';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateBookmarkDTO } from './../src/bookmark/dto/create-bookmark.dto';
import { PrismaSerivce } from './../src/prisma/prisma.service';

describe('Bookmark Controller  (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let bookmarkResult: Bookmark;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const prismaService: PrismaSerivce =
      moduleFixture.get<PrismaSerivce>(PrismaSerivce);

    await prismaService.bookmark.deleteMany();

    await prismaService.user.deleteMany();

    await request(app.getHttpServer()).post('/auth/signup').send({
      email: 'test@gmail.com',
      password: 'password',
    });

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'test@gmail.com',
        password: 'password',
      });
    token = response.body.accessToken;
    console.log(token);
  });

  it('/ (GET)', async () => {
    const result = await request(app.getHttpServer())
      .get('/bookmark')
      .set('Authorization', `Bearer ${token}`);

    expect(result.statusCode).toBe(200);

    expect(result.body).toHaveLength(0);
  });

  it('/ (POST)', async () => {
    const bookmark: CreateBookmarkDTO = {
      name: 'test',
      url: 'test.png',
      description: 'test description',
    };
    const result = await request(app.getHttpServer())
      .post('/bookmark')
      .set('Authorization', `Bearer ${token}`)
      .send(bookmark);

    expect(result.statusCode).toBe(201);

    expect(result.body).toMatchObject({
      ...bookmark,
    });

    expect(result.body.id).toBeDefined();
    expect(result.body.userId).toBeDefined();
    bookmarkResult = result.body;
  });

  it('/:id (GET)', async () => {
    const result = await request(app.getHttpServer())
      .get('/bookmark/' + bookmarkResult.id)
      .set('Authorization', `Bearer ${token}`);

    expect(result.statusCode).toBe(200);

    expect(result.body).toMatchObject(bookmarkResult);
  });

  it('/:id (DELETE)', async () => {
    const result = await request(app.getHttpServer())
      .delete('/bookmark/1')
      .set('Authorization', `Bearer ${token}`);

    expect(result.statusCode).toBe(200);

    expect(result.body).toMatchObject({});
  });

  it('/ (PUT)', async () => {
    const bookmark: CreateBookmarkDTO = {
      name: 'b3',
      url: 'b3.com',
      description: 'b3 description',
    };
    const result = await request(app.getHttpServer())
      .put('/bookmark/' + bookmarkResult.id)
      .set('Authorization', `Bearer ${token}`)
      .send(bookmark);

    expect(result.statusCode).toBe(200);

    expect(result.body).toMatchObject({
      ...bookmark,
      id: bookmarkResult.id,
      userId: bookmarkResult.userId,
    });
  });
});
