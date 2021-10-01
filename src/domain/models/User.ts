import { IEntity } from 'domain/common/IEntity'

/**
 * ユーザードメイン
 * 実体となるモデル
 */
export default class User implements IEntity {
  id: number
  name: string
  email: string
  password: string

  constructor(name: string, email: string, password?: string, id?: number) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }

  equals(entity: IEntity) {
    if (!(entity instanceof User)) return false
    return this.id === entity.id
  }
}
