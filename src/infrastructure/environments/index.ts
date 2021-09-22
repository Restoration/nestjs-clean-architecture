/**
 * 環境変数の読み込み
 */
export const getEnv = (keyName: string): string => {
  const v = process?.env[keyName]
  if (v === '') {
    // eslint-disable-next-line no-console
    console.error(`環境変数の${keyName}には空文字は指定できません。`)
    return ''
  }
  if (!v) {
    // eslint-disable-next-line no-console
    console.error(`環境変数に${keyName}が存在しません。`)
    return ''
  }
  return v
}

/**
 * 環境変数を変数にセットする
 */
export default () => {
  const port = Number(getEnv('PORT'))
  const baseUrl = String(getEnv('BASE_URL'))
  const appServerUrl = String(getEnv('APP_SERVER_URL'))
  const publicKey = String(getEnv('JWT_PUBLIC_KEY')).replace(/\\n/g, '\n')
  const privateKey = String(getEnv('JWT_PRIVATE_KEY')).replace(/\\n/g, '\n')

  const corsOrign = String(getEnv('CORS_ORIGIN'))
  const apiEnvironment = String(getEnv('API_ENVIRONMENT'))

  return {
    port,
    apiEnvironment,
    corsOrign,
    baseUrl,
    appServerUrl,
    publicKey,
    privateKey,
  }
}
