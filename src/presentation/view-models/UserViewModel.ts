import { plainToClass, Expose } from 'class-transformer'

import User from 'domain/models/User'

/**
 * ビューモデル
 * 使用者に受け渡すためのモデル
 * これがAPIレスポンスになる
 */
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
