import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AuthDto } from "../src/auth/dto/auth.dto";
import { ALREADY_REGISTRY_ERROR, WRONG_PASSWORD_ERROR } from "../src/auth/auth.constants";
import { disconnect } from "mongoose";

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const authDto: AuthDto = {
    login: 'a1@y.ru',
    password: '123',
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  xit('/auth/register (POST) success', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(authDto)
      .expect(201)
  });

  it('/auth/register (POST) fail', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(authDto)
      .expect(400, { statusCode: 400, message: ALREADY_REGISTRY_ERROR,  error: 'Bad Request' })
  });

  it('/auth/login (POST) success', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(authDto)
      .expect(200)
      .then(({body}: request.Response) => {
        expect(body.access_token).toBeDefined();
      });
  });

  it('/auth/login (POST) fail login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...authDto, login: 'non-existent'})
      .expect(401)
  });

  it('/auth/login (POST) fail password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({...authDto, password: 'wrong-password'})
      .expect(401, { statusCode: 401, message: WRONG_PASSWORD_ERROR, error: 'Unauthorized'  })
  });

  afterAll(() => {
    disconnect();
  });
});
