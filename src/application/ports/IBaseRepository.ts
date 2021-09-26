import { Injectable } from '@nestjs/common'
import {
  FindManyOptions,
  FindConditions,
  ObjectID,
  FindOneOptions,
  UpdateResult,
  DeleteResult,
  DeepPartial,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

/**
 * リポジトリ共通の抽象
 */
@Injectable()
export abstract class IBaseRepository<Entity> {
  abstract find(options?: FindManyOptions<Entity>): Promise<Entity[]>

  abstract find(conditions?: FindConditions<Entity>): Promise<Entity[]>

  abstract find(optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<Entity[]>

  abstract findOne(options?: FindOneOptions<Entity>): Promise<Entity | undefined>

  abstract findOne(conditions?: FindConditions<Entity>, options?: FindOneOptions<Entity>): Promise<Entity | undefined>

  abstract findOne(
    optionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<Entity> | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>

  abstract create(): Entity

  abstract create(entityLikeArray: DeepPartial<Entity>[]): Entity[]

  abstract create(entityLike: DeepPartial<Entity>): Entity

  abstract create(plainEntityLikeOrPlainEntityLikes?: DeepPartial<Entity> | DeepPartial<Entity>[]): Entity | Entity[]

  abstract update(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult>

  abstract delete(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
  ): Promise<DeleteResult>

  abstract transaction<T>(operation: () => Promise<T>): Promise<T>
}
