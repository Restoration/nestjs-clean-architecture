import { IEntity } from 'domain/common/IEntity'

export default class User implements IEntity {
  private _id: number
  private _name: string
  private _email: string
  private _createdAt?: Date
  private _updatedAt?: Date

  constructor(id: number, name: string, email: string) {
    this._id = id
    this._name = name
    this._email = email
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

  // get createdAt(): Date {
  //   return this._createdAt
  // }

  // get updatedAt(): Date {
  //   return this._updatedAt
  // }

  equals(entity: IEntity) {
    if (!(entity instanceof User)) return false
    return this._id === entity._id
  }
}
