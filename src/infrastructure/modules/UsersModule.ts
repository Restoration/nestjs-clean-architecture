import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IUsersRepository } from 'application/ports/IUsersRepository'
import { UsersUseCase } from 'application/usecases/UsersUseCase'
import { UsersRepository } from 'infrastructure/repositories/UsersRepository'
import { UsersController } from 'presentation/controllers/UsersController'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [UsersController],
  exports: [],
  providers: [UsersUseCase, { provide: IUsersRepository, useClass: UsersRepository }],
})
export class UsersModule {}
