import { plainToClass, Expose } from 'class-transformer'

import User from 'domain/models/User'

export class UserViewModel {
  @Expose()
  id: number

  @Expose()
  name: string

  @Expose()
  email: string

  @Expose()
  createdAt: Date

  @Expose()
  updatedAt: Date

  /** オブジェクトをクラスに変換 */
  static toViewModel(user: User): UserViewModel {
    return plainToClass(UserViewModel, user, { excludeExtraneousValues: true })
  }
}
