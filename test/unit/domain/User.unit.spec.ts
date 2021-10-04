import User from 'domain/models/User';

describe('ユーザードメインのテスト', () => {
  let USER_MOCK: User;
  const USER_OBJECT = { name: 'Test', email: 'test@devark.jp' };

  beforeEach(() => {
    USER_MOCK = new User('Test', 'test@devark.jp', 'zxcvbnm0', 1);
  });

  it('ユーザー作成可能であるか', () => {
    const user = new User('Test', 'test@devark.jp');

    expect(user instanceof User).toBeTruthy();
    expect(user).toEqual(USER_OBJECT);
  });
});