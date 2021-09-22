import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { IContext } from 'infrastructure/logger/context'

export default class LoggerAdapter {
  private getHeader(req: Request): object {
    const headers = JSON.parse(JSON.stringify(req?.headers || {}))
    delete headers.authorization
    delete headers.cookie
    return headers as object
  }

  private getClaim(req: Request): { sub: number } {
    const bearerToken = req?.headers?.authorization || ''
    const token = bearerToken.replace(/^Bearer\s/, '')
    return jwt.decode(token)
  }

  public convertContext(req: Request, res: Response): IContext {
    const claim = this.getClaim(req)
    const headers = this.getHeader(req)
    return {
      req: {
        baseUrl: res?.req.baseUrl || '',
        method: req?.method || '',
        query: req?.query || {},
        claim,
        headers,
      },
      res,
    }
  }
}
