import { Injectable } from '@nestjs/common'
import { FindManyOptions, FindConditions, ObjectID, FindOneOptions } from 'typeorm'

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
  abstract transaction<T>(operation: () => Promise<T>): Promise<T>
}
