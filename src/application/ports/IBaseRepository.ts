import { Injectable } from '@nestjs/common'
import {
  FindManyOptions,
  FindConditions,
  ObjectID,
  FindOneOptions,
  UpdateResult,
  DeleteResult,
  DeepPartial,
  SaveOptions,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

/**
 * リポジトリ共通の抽象
 */
@Injectable()
export abstract class IBaseRepository<Entity> {
  abstract create(): Entity

  abstract create(entityLikeArray: DeepPartial<Entity>[]): Entity[]

  abstract create(entityLike: DeepPartial<Entity>): Entity

  abstract create(plainEntityLikeOrPlainEntityLikes?: DeepPartial<Entity> | DeepPartial<Entity>[]): Entity | Entity[]

  abstract find(options?: FindManyOptions<Entity>): Promise<Entity[]>

  abstract find(conditions?: FindConditions<Entity>): Promise<Entity[]>

  abstract find(optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<Entity[]>

  abstract findOne(options?: FindOneOptions<Entity>): Promise<Entity | undefined>

  abstract findOne(conditions?: FindConditions<Entity>, options?: FindOneOptions<Entity>): Promise<Entity | undefined>

  abstract findOne(
    optionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<Entity> | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>

  abstract save<T extends DeepPartial<Entity>>(entities: T[], options: SaveOptions & { reload: false }): Promise<T[]>

  abstract save<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<(T & Entity)[]>

  abstract save<T extends DeepPartial<Entity>>(entity: T, options: SaveOptions & { reload: false }): Promise<T>

  abstract save<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T & Entity>

  abstract save<T extends DeepPartial<Entity>>(entityOrEntities: T | T[], options?: SaveOptions): Promise<T | T[]>

  abstract update(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult>

  abstract delete(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
  ): Promise<DeleteResult>

  abstract query(query: string, parameters?: any[]): Promise<any>

  abstract transaction<T>(operation: () => Promise<T>): Promise<T>
}
