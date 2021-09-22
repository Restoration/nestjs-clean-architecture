import { Injectable } from '@nestjs/common'

import User from 'domain/models/User'

import { IBaseRepository } from './IBaseRepository'

@Injectable()
export abstract class IUsersRepository extends IBaseRepository<User> {}
