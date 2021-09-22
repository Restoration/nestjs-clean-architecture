import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common'

import { UsersUseCase } from 'application/usecases/UsersUseCase'
import { CreateUserRequest, UpdateUserRequest, DeleteUserRequest, GetUserRequest } from 'presentation/requests/user'
import { UserViewModel } from 'presentation/view-models/UserViewModel'

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
    } catch {}
  }

  // @Post('create')
  // public async createUser(@Body() params: CreateUserRequest): Promise<UserViewModel> {
  //   try {
  //     const user = await this.useCase.createUser(params)
  //     return UserViewModel.toViewModel(user)
  //   } catch {}
  // }

  // @Put('update')
  // public async updateUser(@Param() params: UpdateUserRequest): Promise<UserViewModel> {}

  // @Delete('delete')
  // public async deleteUser(@Param() params: DeleteUserRequest): Promise<boolean> {}
}
