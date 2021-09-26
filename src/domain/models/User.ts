import { IEntity } from 'domain/common/IEntity'

/**
 * ユーザードメイン
 * 実体となるモデル
 */
export default class User implements IEntity {
  private _id: number
  private _name: string
  private _email: string
  private _password: string

  constructor(name: string, email: string, password?: string, id?: number) {
    this._id = id
    this._name = name
    this._email = email
    this._password = password
  }

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get email(): string {
    return this._email
  }

  get password(): string {
    return this._password
  }

  equals(entity: IEntity) {
    if (!(entity instanceof User)) return false
    return this._id === entity._id
  }
}
