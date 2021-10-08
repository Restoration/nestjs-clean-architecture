import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from 'infrastructure/modules/usersModule'

export const init = () =>
  Test.createTestingModule({
    imports: [
      UsersModule,
      TypeOrmModule.forRoot(),
      ConfigModule.forRoot({
        isGlobal: true,
        expandVariables: true,
        envFilePath: `.env.${process.env.NODE}`,
      }),
    ],
  }).compile()
