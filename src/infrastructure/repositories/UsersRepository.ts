import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

import { IUsersRepository } from 'application/ports/IUsersRepository'
import User from 'domain/models/User'
import UserEntity from 'infrastructure/entities/UserEntity'
import { BaseRepository } from 'infrastructure/repositories/BaseRepository'

/**
 * ユーザーリポジトリ
 * ユーザーのデータを永続化するための箇所
 */
@Injectable()
export class UsersRepository extends BaseRepository<User> implements IUsersRepository {
  constructor(@InjectConnection() connection: Connection) {
    super(connection, UserEntity)
  }
}
