import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { UpdateResult, DeleteResult } from 'typeorm'

import { IUsersRepository } from 'application/ports/IUsersRepository'
import { UsersUseCase } from 'application/usecases/UsersUseCase'
import User from 'domain/models/User'

/**
 * @nestjs/testing
 * nestjsのテストフレームワーク
 * テストランナーとアサート関数を提供している
 *
 * Assert関数
 * ある式・値が想定したものになっているかを確認する関数
 *
 * createTestingModule()
 *
 * https://docs.nestjs.com/fundamentals/testing#testing-utilities
 *
 * ex.
 * const moduleRef = await Test.createTestingModule({
 *      controllers: [CatsController],
 *      providers: [CatsService],
 * }).compile();
 *
 * spyOn
 * クラスのインスタンスを作成後、jest.spyOn()でmock化し処理を定義
 * 指定したメソッドがコールされているかどうかを確認できる
 *
 * mockImplementation
 * 関数の動作の検証
 *
 *
 */

describe('UsersUseCase Test', () => {
  let usersRepository: IUsersRepository
  let usersUseCase: UsersUseCase

  const USER = new User('DevArk', 'test@devark.jp', 'zxcvbnm0', 1)
  const USER_OBJECT = {
    id: 1,
    name: 'DevArk',
    email: 'test@devark.jp',
    createdAt: new Date('2020-10-01T06:37:07.969Z'),
    updatedAt: new Date('2020-10-01T06:37:07.969Z'),
  } as User

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersUseCase,
        {
          provide: IUsersRepository,
          useFactory: () => ({
            findOne: jest.fn(() => true),
            find: jest.fn(() => true),
            save: jest.fn(() => true),
            create: jest.fn(() => true),
            update: jest.fn(() => true),
            delete: jest.fn(() => true),
          }),
        },
      ],
    }).compile()

    usersRepository = module.get<IUsersRepository>(IUsersRepository)
    usersUseCase = module.get<UsersUseCase>(UsersUseCase)
  })

  it('ユーザーを作成する', async () => {
    jest.spyOn(usersRepository, 'save').mockImplementation(async () => USER_OBJECT)

    const result = await usersUseCase.createUser(USER_OBJECT)

    expect(result).toEqual(USER_OBJECT)
  })

  it('ユーザーIDからユーザーを取得する', async () => {
    jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => USER_OBJECT)

    const user = await usersUseCase.getUser(1)

    expect(user instanceof User)
    expect(user).toBe(USER_OBJECT)
  })

  it('存在しないユーザーIDでユーザーを取得する', async () => {
    try {
      jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => null)
      await usersUseCase.getUser(2)
    } catch (err) {
      expect(err instanceof NotFoundException).toBeFalsy()
    }
  })

  it('全てのユーザーを取得する', async () => {
    jest.spyOn(usersRepository, 'find').mockImplementation(async () => [USER_OBJECT])
    const users = await usersUseCase.getUsers()

    expect(users).toHaveLength(1)
    expect(users).toStrictEqual([USER_OBJECT])
  })

  it('ユーザー情報を更新する', async () => {
    jest.spyOn(usersRepository, 'update').mockImplementation(async () => ({ affected: 1 } as UpdateResult))
    const updated = await usersUseCase.updateUser(USER)

    expect(updated).toBeTruthy()
  })

  it('ユーザーを削除する', async () => {
    jest.spyOn(usersRepository, 'delete').mockImplementation(async () => ({ affected: 1 } as DeleteResult))
    const deleted = await usersUseCase.deleteUser(1)

    expect(deleted).toBeTruthy()
  })
})
