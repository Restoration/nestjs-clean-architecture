import { Test } from '@nestjs/testing'

import { UsersUseCase } from 'application/usecases/UsersUseCase'
import User from 'domain/models/User'
import { UsersController } from 'presentation/controllers/UsersController'
import { UserViewModel } from 'presentation/view-models/UserViewModel'

describe('UsersControllerのテスト', () => {
  let usersController
  let usersUseCases

  const USER_VM = {
    id: 1,
    name: 'DevArk',
    email: 'test@devark.jp',
    password: 'zxcvbnm0',
    createdAt: new Date('2020-10-01 02:20:58.037572-03'),
    updatedAt: new Date('2020-10-01 02:20:58.037572-03'),
  } as UserViewModel

  const USER = new User('DevArk', 'test@devark.jp', 'zxcvbnm0', 1)
  USER.createdAt = new Date('2020-10-01 02:20:58.037572-03')
  USER.updatedAt = new Date('2020-10-01 02:20:58.037572-03')

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersController,
        {
          provide: UsersUseCase,
          useFactory: () => ({
            getUser: jest.fn(() => true),
            getUsers: jest.fn(() => true),
            createUser: jest.fn(() => true),
            updateUser: jest.fn(() => true),
            deleteUser: jest.fn(() => true),
          }),
        },
      ],
    }).compile()

    usersUseCases = module.get<UsersUseCase>(UsersUseCase)
    usersController = module.get<UsersController>(UsersController)
  })

  it('ユーザー単体の情報が返ってくること [GET]/:id', async () => {
    jest.spyOn(usersUseCases, 'getUser').mockImplementation(async () => USER)

    const userVM = await usersController.getUser({ id: 1 })

    expect(userVM instanceof UserViewModel).toBeTruthy()
    expect(userVM).toEqual(USER_VM)
  })

  it('ユーザー複数の情報が返ってくること [GET]/', async () => {
    jest.spyOn(usersUseCases, 'getUsers').mockImplementation(async () => [USER, USER])

    const userVMs = await usersController.getUser()

    expect(userVMs).toEqual([USER_VM, USER_VM])
  })

  it('ユーザーの作成ができること [POST]/create', async () => {
    jest.spyOn(usersUseCases, 'createUser').mockImplementation(async () => true)

    const isSuccess = await usersController.createUser(USER)

    expect(isSuccess).toBeTruthy()
  })

  it('ユーザーの更新ができること [PUT]/update', async () => {
    jest.spyOn(usersUseCases, 'updateUser').mockImplementation(async () => true)

    const isSuccess = await usersController.updateUser({
      id: 2,
      name: 'dev',
      email: 'foo@devark.jp',
      password: 'password123',
    })

    expect(isSuccess).toBeTruthy()
  })

  it('ユーザーの削除ができること [POST]/delete', async () => {
    jest.spyOn(usersUseCases, 'deleteUser').mockImplementation(async () => true)

    const isSuccess = await usersController.deleteUser(1)

    expect(isSuccess).toBeTruthy()
  })
})
