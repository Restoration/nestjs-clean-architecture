import { Injectable } from '@nestjs/common'

import { IUsersRepository } from 'application/ports/IUsersRepository'
import User from 'domain/models/User'

@Injectable()
export class UsersUseCase {
  constructor(private readonly repository: IUsersRepository) {}

  public async getUser(id: number): Promise<User> {
    return await this.repository.findOne(id)
  }

  public async getUsers(): Promise<User[]> {
    return await this.repository.find()
  }

  // public async createUser(): Promise<User> {
  //   return await this.repository.insert();

  // }

  // public async updateUser(): Promise<User> {}

  // public async deleteUser(): Promise<boolean> {}
}
