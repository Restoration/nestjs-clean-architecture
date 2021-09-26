import { AsyncLocalStorage } from 'async_hooks'
import { Response } from 'express'

/** ログコンテキスト */
export interface IContext {
  req: {
    baseUrl: string
    method: string
    query: object
    headers: object
  }
  res: Response
}

/** ログを保存するためのクラスを初期化 */
export const logAsyncLocalStorage = () => new AsyncLocalStorage<IContext>()
