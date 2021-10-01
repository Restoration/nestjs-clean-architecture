import { Type } from 'class-transformer'
import { Length, IsEmail, IsString, IsNumber, IsOptional } from 'class-validator'

import User from 'domain/models/User'

/**
 * リクエストの型を定義する
 * class-validatorをミドルウェアとして挟むようにして
 * コントローラーでバリデーションをする
 */
export class GetUserQuery {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  id: number
}

export class CreateUserParams {
  @Length(10, 20)
  @IsString()
  name: string

  @IsEmail()
  @IsString()
  email: string

  @Length(8, 24)
  @IsString()
  password: string

  /** モデルに変換する */
  static fromViewModel(vm: CreateUserParams): User {
    return new User(vm.name, vm.email, vm.password)
  }
}

export class UpdateUserParams extends CreateUserParams {
  @IsNumber()
  @Type(() => Number)
  id: number

  /** モデルに変換する */
  static fromViewModel(vm: UpdateUserParams): User {
    return new User(vm.name, vm.email, vm.password, vm.id)
  }
}

export class DeleteUserParams {
  @IsNumber()
  @Type(() => Number)
  id: number
}
