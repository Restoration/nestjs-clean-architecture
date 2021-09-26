/** ドメインモデル共通の抽象 */
export interface IEntity {
  equals(entity: IEntity): boolean
}
