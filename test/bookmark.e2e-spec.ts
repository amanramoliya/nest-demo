import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateBookmarkDTO } from './../src/bookmark/dto/create-bookmark.dto';
import { PrismaSerivce } from './../src/prisma/prisma.service';

describe('Bookmark Controller  (e2e)', () => {
  let app: INestApplication;
  let token: string;

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
  });
});
