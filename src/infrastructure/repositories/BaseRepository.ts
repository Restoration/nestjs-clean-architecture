import {
  ObjectLiteral,
  EntityManager,
  QueryRunner,
  ObjectID,
  FindConditions,
  UpdateResult,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  EntitySchema,
  Connection,
  DeepPartial,
  SaveOptions,
} from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

/**
 * ベースとなるリポジトリの実体
 */
export class BaseRepository<Entity extends ObjectLiteral> {
  readonly manager: EntityManager
  readonly queryRunner?: QueryRunner
  readonly entitySchema: EntitySchema<Entity>

  constructor(connection: Connection, entity: EntitySchema<Entity>) {
    this.queryRunner = connection.createQueryRunner()
    this.manager = this.queryRunner.manager
    this.entitySchema = entity
  }

  create(): Entity

  create(entityLikeArray: DeepPartial<Entity>[]): Entity[]

  create(entityLike: DeepPartial<Entity>): Entity

  create(plainEntityLikeOrPlainEntityLikes?: DeepPartial<Entity> | DeepPartial<Entity>[]): Entity | Entity[] {
    return this.manager.create<any>(this.entitySchema as any, plainEntityLikeOrPlainEntityLikes as any)
  }

  find(options?: FindManyOptions<Entity>): Promise<Entity[]>

  find(conditions?: FindConditions<Entity>): Promise<Entity[]>

  find(optionsOrConditions?: FindManyOptions<Entity> | FindConditions<Entity>): Promise<Entity[]> {
    return this.manager.find(this.entitySchema as any, optionsOrConditions as any)
  }

  findOne(options?: FindOneOptions<Entity>): Promise<Entity | undefined>

  findOne(conditions?: FindConditions<Entity>, options?: FindOneOptions<Entity>): Promise<Entity | undefined>

  findOne(
    optionsOrConditions?: string | number | Date | ObjectID | FindOneOptions<Entity> | FindConditions<Entity>,
    maybeOptions?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined> {
    return this.manager.findOne(this.entitySchema as any, optionsOrConditions as any, maybeOptions)
  }

  save<T extends DeepPartial<Entity>>(entities: T[], options: SaveOptions & { reload: false }): Promise<T[]>

  save<T extends DeepPartial<Entity>>(entities: T[], options?: SaveOptions): Promise<(T & Entity)[]>

  save<T extends DeepPartial<Entity>>(entity: T, options: SaveOptions & { reload: false }): Promise<T>

  save<T extends DeepPartial<Entity>>(entity: T, options?: SaveOptions): Promise<T & Entity>

  save<T extends DeepPartial<Entity>>(entityOrEntities: T | T[], options?: SaveOptions): Promise<T | T[]> {
    return this.manager.save<T>(entityOrEntities as any, options)
  }

  update(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return this.manager.update(this.entitySchema as any, criteria as any, partialEntity)
  }

  delete(
    criteria: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<Entity>,
  ): Promise<DeleteResult> {
    return this.manager.delete(this.entitySchema as any, criteria as any)
  }

  query(query: string, parameters?: any[]): Promise<any> {
    return this.manager.query(query, parameters)
  }

  async transaction<T>(operation: () => Promise<T>): Promise<T> {
    await this.queryRunner.connect()
    await this.queryRunner.startTransaction()

    try {
      const result = await operation()

      await this.queryRunner.commitTransaction()
      return result
    } catch (err) {
      await this.queryRunner.rollbackTransaction()
    } finally {
      await this.queryRunner.release()
    }
  }
}
