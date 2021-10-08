import { Controller, Get, Post, Put, Delete, Body, Query } from '@nestjs/common'

import { UsersUseCase } from 'application/usecases/UsersUseCase'
import { CreateUserParams, UpdateUserParams, DeleteUserParams, GetUserQuery } from 'presentation/requests/user'
import { UserViewModel } from 'presentation/view-models/UserViewModel'

/**
 * ユーザーコントローラー
 * I/O(Input/Output)の操作をする、入り口であり出口になる
 * リクエストされたデータを受け取り、アプリケーションに伝える
 * アプリケーションの返り値として受け取ったデータをビューモデルに変換してAPIレスポンスとして返す
 */
@Controller(`api/v1/users`)
export class UsersController {
  constructor(private readonly useCase: UsersUseCase) {}

  @Get('/')
  public async getUser(@Query() query: GetUserQuery): Promise<UserViewModel | UserViewModel[]> {
    try {
      if (query?.id) {
        const user = await this.useCase.getUser(query.id)
        return UserViewModel.toViewModel(user)
      }
      const users = await this.useCase.getUsers()
      return users.map((user) => UserViewModel.toViewModel(user))
    } catch (e) {
      console.error(e)
      throw new Error('予期せぬエラーが発生しました')
    }
  }

  @Post('create')
  public async createUser(@Body() params: CreateUserParams): Promise<UserViewModel> {
    try {
      return await this.useCase.createUser(CreateUserParams.fromViewModel(params))
    } catch (e) {
      console.error(e)
      throw new Error('予期せぬエラーが発生しました')
    }
  }

  @Put('update')
  public async updateUser(@Body() params: UpdateUserParams): Promise<{ isSuccess: boolean }> {
    try {
      return {
        isSuccess: await this.useCase.updateUser(UpdateUserParams.fromViewModel(params)),
      }
    } catch {
      throw new Error('予期せぬエラーが発生しました')
    }
  }

  @Delete('delete')
  public async deleteUser(@Query() query: DeleteUserParams): Promise<{ isSuccess: boolean }> {
    try {
      return {
        isSuccess: await this.useCase.deleteUser(query.id),
      }
    } catch {
      throw new Error('予期せぬエラーが発生しました')
    }
  }
}
