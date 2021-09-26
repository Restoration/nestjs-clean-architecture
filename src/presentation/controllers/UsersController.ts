import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common'

import { UsersUseCase } from 'application/usecases/UsersUseCase'
import { CreateUserRequest, UpdateUserRequest, DeleteUserRequest, GetUserRequest } from 'presentation/requests/user'
import { UserViewModel } from 'presentation/view-models/UserViewModel'

/**
 * ユーザーコントローラー
 * I/O(Input/Output)の操作をする、入り口であり出口になる
 * リクエストされたデータを受け取り、アプリケーションに伝える
 * アプリケーションの返り値として受け取ったデータをビューモデルに変換してAPIレスポンスとして返す
 */
@Controller(`api/v1/user`)
export class UsersController {
  constructor(private readonly useCase: UsersUseCase) {}

  @Get('/')
  public async getUser(@Query() query: GetUserRequest): Promise<UserViewModel> {
    try {
      const user = await this.useCase.getUser(query.id)
      return UserViewModel.toViewModel(user)
    } catch {}
  }

  @Get('users')
  public async getUsers(): Promise<UserViewModel[]> {
    try {
      const users = await this.useCase.getUsers()
      return users.map((user) => UserViewModel.toViewModel(user))
    } catch {
      throw new Error('予期せぬエラーが発生しました')
    }
  }

  @Post('create')
  public async createUser(@Body() params: CreateUserRequest): Promise<UserViewModel> {
    try {
      const user = await this.useCase.createUser(CreateUserRequest.fromViewModel(params))
      return UserViewModel.toViewModel(user)
    } catch {
      throw new Error('予期せぬエラーが発生しました')
    }
  }

  @Put('update')
  public async updateUser(@Param() params: UpdateUserRequest): Promise<boolean> {
    try {
      return await this.useCase.updateUser(UpdateUserRequest.fromViewModel(params))
    } catch {
      throw new Error('予期せぬエラーが発生しました')
    }
  }

  @Delete('delete')
  public async deleteUser(@Param() params: DeleteUserRequest): Promise<boolean> {
    try {
      return await this.useCase.deleteUser(params.id)
    } catch {
      throw new Error('予期せぬエラーが発生しました')
    }
  }
}
