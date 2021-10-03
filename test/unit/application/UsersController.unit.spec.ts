import { Test } from '@nestjs/testing';
import { UsersController } from 'presentation/controllers/UsersController';
import { UsersUseCase } from 'application/usecases/UsersUseCase';
import User from 'domain/models/User';
import { UserViewModel } from 'presentation/view-models/UserViewModel';
import { GetUserQuery } from 'presentation/requests/user';

describe('UsersController Test', () => {
  let usersController;
  let usersUseCases;

  const USER_VM = {
    id: 1,
    name: 'Test',
    email: 'test@devark.jp',
    password: 'zxcvbnm0',
    createdAt: new Date('2020-05-31 02:20:58.037572-03'),
    updatedAt: new Date('2020-05-31 02:20:58.037572-03'),
  } as UserViewModel;

  const USER = new User('Test', 'test@devark.jp', 'zxcvbnm0', 1);
  USER.createdAt = new Date('2020-05-31 02:20:58.037572-03');
  USER.updatedAt = new Date('2020-05-31 02:20:58.037572-03');

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
    }).compile();

    usersUseCases = module.get<UsersUseCase>(UsersUseCase);
    usersController = module.get<UsersController>(UsersController);
  });

  it('ユーザー単体の情報が返ってくること [GET]/:id', async () => {
    jest
      .spyOn(usersUseCases, 'getUser')
      .mockImplementation(async () => USER);

    const userVM = await usersController.getUser({id: 1});

    expect(userVM instanceof UserViewModel).toBeTruthy();
    expect(userVM).toEqual(USER_VM);
  });
});