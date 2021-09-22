import { AsyncLocalStorage } from 'async_hooks'
import { Response } from 'express'

export interface IContext {
  req: {
    baseUrl: string
    method: string
    query: object
    claim: object
    headers: object
  }
  res: Response
}

export const logAsyncLocalStorage = () => new AsyncLocalStorage<IContext>()
