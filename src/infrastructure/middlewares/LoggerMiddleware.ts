import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

import Logger from 'infrastructure/logger'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger = new Logger()) {}

  use(req: Request, res: Response, next: Function) {
    this.logger.setLogLocalStorage(req, res)
    next()
  }
}
