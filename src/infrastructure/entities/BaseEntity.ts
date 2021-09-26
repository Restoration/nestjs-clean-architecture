import { EntitySchemaColumnOptions } from 'typeorm'

/**
 * DBとアプリ間の仲介者としてのクラス
 * テーブル間との関係を定義
 * id, createdAt, updatedAtはどのテーブルにおいても共通なので
 * 共通で使用可能なEntityとして定義しておく
 */
export const BaseEntity = {
  id: {
    type: Number,
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
  createdAt: {
    name: 'created_at',
    type: 'timestamp',
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamp',
    updateDate: true,
  } as EntitySchemaColumnOptions,
}
