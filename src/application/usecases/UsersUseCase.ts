import { Injectable } from '@nestjs/common'

import { IUsersRepository } from 'application/ports/IUsersRepository'
import User from 'domain/models/User'

/**
 * ユーザーユースケース
 * アプリケーションが何をできるのかを表す
 * 使用者の目線でシステムの振る舞いを表現している箇所
 *
 * */
@Injectable()
export class UsersUseCase {
  constructor(private readonly repository: IUsersRepository) {}

  /** ユーザー単体を取得 */
  public async getUser(id: number): Promise<User> {
    return await this.repository.findOne(id)
  }

  /** 複数ユーザーを取得 */
  public async getUsers(): Promise<User[]> {
    return await this.repository.find()
  }

  /**
   * ユーザー作成
   *
   */
  public async createUser(params: User): Promise<User> {
    const user = this.repository.create(params)
    return await this.repository.save(user)
  }

  /**
   * ユーザー更新
   *
   */
  public async updateUser(params: User): Promise<boolean> {
    const result = await this.repository.update({ id: params.id }, params)
    return result.affected > 0
  }

  /**
   * ユーザー削除
   *
   * */
  public async deleteUser(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id })
    return result.affected > 0
  }
}
