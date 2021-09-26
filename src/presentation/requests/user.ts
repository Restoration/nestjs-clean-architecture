import { Length, IsEmail, Min, IsString, IsNumber } from 'class-validator'

import User from 'domain/models/User'

/**
 * リクエストの型を定義する
 * class-validatorをミドルウェアとして挟むようにして
 * コントローラーでバリデーションをする
 */
export class GetUserRequest {
  @IsNumber()
  id: number
}

export class CreateUserRequest {
  @Length(10, 20)
  @IsString()
  name: string

  @IsEmail()
  @IsString()
  email: string

  @Min(8)
  @IsString()
  password: string

  /** モデルに変換する */
  static fromViewModel(vm: CreateUserRequest): User {
    return new User(vm.name, vm.email, vm.password)
  }
}

export class UpdateUserRequest {
  @Length(10, 20)
  @IsString()
  name: string

  @IsEmail()
  @IsString()
  email: string

  @Min(8)
  @IsString()
  password: string

  /** モデルに変換する */
  static fromViewModel(vm: UpdateUserRequest): User {
    return new User(vm.name, vm.email, vm.password)
  }
}

export class DeleteUserRequest {
  @IsNumber()
  id: number
}
