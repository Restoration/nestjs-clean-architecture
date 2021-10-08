import User from 'domain/models/User'

describe('ユーザードメインのテスト', () => {
  let USER_MOCK: User
  const USER_OBJECT = { name: 'DevArk', email: 'test@devark.jp', password: 'zxcvbnm0', id: 1 }

  beforeEach(() => {
    USER_MOCK = new User('DevArk', 'test@devark.jp', 'zxcvbnm0', 1)
  })

  it('ユーザー作成可能であるか', () => {
    expect(USER_MOCK instanceof User).toBeTruthy()
    expect(USER_MOCK).toEqual(USER_OBJECT)
  })
})
