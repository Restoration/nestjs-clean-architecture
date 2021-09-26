import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LoggerMiddleware } from 'infrastructure/middlewares/LoggerMiddleware'
import { UsersModule } from 'infrastructure/modules/UsersModule'

@Module({
  imports: [
    // Env Config
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // API Module
    UsersModule,
    // TypeORM
    TypeOrmModule.forRoot(),
  ],
  providers: [],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
