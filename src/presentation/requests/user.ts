import { Length, IsEmail, Min, IsString, IsNumber } from 'class-validator'

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
}

export class DeleteUserRequest {
  @IsNumber()
  id: number
}
