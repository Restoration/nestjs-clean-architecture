import { Request, Response } from 'express'

import { IContext } from 'infrastructure/logger/context'

/**
 * ログアダプター
 * ログを整形するための変換クラス
 */
export default class LoggerAdapter {
  /** リクエストヘッダーから必要なデータを整形 */
  private getHeader(req: Request): object {
    const headers = JSON.parse(JSON.stringify(req?.headers || {}))
    delete headers.authorization
    delete headers.cookie
    return headers as object
  }

  public convertContext(req: Request, res: Response): IContext {
    const headers = this.getHeader(req)
    return {
      req: {
        baseUrl: res?.req.baseUrl || '',
        method: req?.method || '',
        query: req?.query || {},
        headers,
      },
      res,
    }
  }
}
