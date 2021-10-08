import { INestApplication, HttpStatus } from '@nestjs/common'
import * as request from 'supertest'

import { IUsersRepository } from 'application/ports/IUsersRepository'

import { init } from '../helper/module'

describe('Users', () => {
  let app: INestApplication
  let usersRepository: IUsersRepository

  beforeAll(async () => {
    const module = await init()
    app = module.createNestApplication()
    await app.init()
    usersRepository = module.get<IUsersRepository>(IUsersRepository)
  })

  it(`ユーザー作成が正しく行われること`, async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/users/create')
      .send({ name: 'DevArk', email: 'test@devark.jp', password: 'zxcvbnm0' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(HttpStatus.CREATED)

    expect(res.statusCode).toEqual(HttpStatus.CREATED)
    expect(res.body).toEqual({
      id: 1,
      name: 'DevArk',
      email: 'test@devark.jp',
      password: 'zxcvbnm0',
      createdAt: res.body.createdAt,
      updatedAt: res.body.updatedAt,
    })
  })

  it(`複数のユーザー情報が取得できること`, async () => {
    const { body } = await request(app.getHttpServer()).get('/api/v1/users').expect(HttpStatus.OK)

    expect(body).toHaveLength(1)
    expect(body[0].id).toBeTruthy()
    expect(body[0].createdAt).toBeTruthy()
    expect(body[0].updatedAt).toBeTruthy()

    expect(body).toEqual([
      {
        id: body[0].id,
        name: 'DevArk',
        email: 'test@devark.jp',
        password: 'zxcvbnm0',
        createdAt: body[0].createdAt,
        updatedAt: body[0].updatedAt,
      },
    ])
  })

  it(`単体のユーザー情報が取得できること`, async () => {
    const { body } = await request(app.getHttpServer()).get('/api/v1/users').query({ id: '1' }).expect(HttpStatus.OK)

    expect(body.id).toBeTruthy()
    expect(body.createdAt).toBeTruthy()
    expect(body.updatedAt).toBeTruthy()

    expect(body).toEqual({
      id: body.id,
      name: 'DevArk',
      email: 'test@devark.jp',
      password: 'zxcvbnm0',
      createdAt: body.createdAt,
      updatedAt: body.updatedAt,
    })
  })

  it(`ユーザー情報が更新できること`, async () => {
    const { body } = await request(app.getHttpServer())
      .put('/api/v1/users/update')
      .send({ id: 1, name: 'dev', email: 'foo@devark.jp', password: 'password123' })
      .expect(HttpStatus.OK)

    expect(body).toEqual({ isSuccess: true })
  })

  it(`ユーザー情報が削除できること`, async () => {
    const { body } = await request(app.getHttpServer())
      .delete('/api/v1/users/delete')
      .query({ id: '1' })
      .expect(HttpStatus.OK)

    expect(body).toEqual({ isSuccess: true })
  })

  afterAll(async () => {
    await usersRepository.query(`DELETE FROM users;`)
    await usersRepository.query(`ALTER TABLE users auto_increment = 1;`)
    await app.close()
  })
})
