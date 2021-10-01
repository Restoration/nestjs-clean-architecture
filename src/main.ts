import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as sourceMapSupport from 'source-map-support'

import { AppModule } from './app.module'

import 'dayjs/locale/ja'

sourceMapSupport.install()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const corsOrigin = configService.get('corsOrign')
  app.enableCors({ origin: corsOrigin })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(configService.get('port'))
}
bootstrap()
