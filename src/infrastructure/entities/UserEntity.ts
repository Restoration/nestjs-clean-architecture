import { EntitySchema } from 'typeorm'

import User from 'domain/models/User'

import { BaseEntity } from './BaseEntity'

/**
 * DBとアプリ間の仲介者としてのクラス
 * ユーザーテーブルとの関係を定義する
 */
const UserEntity = new EntitySchema<User>({
  name: 'User',
  tableName: 'users',
  target: User,
  columns: {
    ...BaseEntity,
    name: {
      type: String,
      length: 100,
    },
    email: {
      type: String,
      length: 100,
    },
  },
  orderBy: {
    createdAt: 'ASC',
  },
  relations: {},
  indices: [
    {
      name: 'IDX_USERS',
      unique: true,
      columns: ['name', 'email'],
    },
  ],
  uniques: [
    {
      name: 'UNIQUE_USERS',
      columns: ['email'],
    },
  ],
})

export default UserEntity
