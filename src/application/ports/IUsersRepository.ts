import { Injectable } from '@nestjs/common'

import User from 'domain/models/User'

import { IBaseRepository } from './IBaseRepository'

/**
 * ユーザーリポジトリの抽象
 * applicationとrepositoryの仲介に入るポート
 */
@Injectable()
export abstract class IUsersRepository extends IBaseRepository<User> {}
