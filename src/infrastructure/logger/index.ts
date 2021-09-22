import { Request, Response } from 'express'

import LoggerAdapter from 'infrastructure/adapters/LoggerAdapter'
import { logAsyncLocalStorage } from 'infrastructure/logger/context'

type LogLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR'

class Logger {
  constructor(private readonly adapter = new LoggerAdapter()) {}

  public setLogLocalStorage(req: Request, res: Response) {
    const ctx = this.adapter.convertContext(req, res)
    logAsyncLocalStorage().enterWith(ctx)
  }

  private getLogLocalStorage() {
    return logAsyncLocalStorage().getStore()
  }

  public printLog(logLevel: LogLevel, payload: object) {
    const { req, res } = this.getLogLocalStorage()
    return {
      logType: 'systemLog',
      baseUrl: res?.req.baseUrl || '',
      statusCode: res?.statusCode || 0,
      level: logLevel,
      ...req,
      ...payload,
    }
  }
}
export default Logger
