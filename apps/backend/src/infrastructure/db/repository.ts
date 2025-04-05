import {
  and,
  eq,
  getTableColumns,
  InferInsertModel,
  InferSelectModel,
  Table,
} from 'drizzle-orm';
import { injectable, unmanaged } from 'inversify';
import { DBClient } from './types';
import { IRepository } from '../../domain';

@injectable()
export abstract class BaseDrizzleRepository<
  T extends Table,
  TSchema extends DBClient,
  Input extends InferInsertModel<T> = InferInsertModel<T>,
  TModel extends InferSelectModel<T> = InferSelectModel<T>
> implements IRepository<Input, TModel>
{
  private readonly boundSelect: typeof this.db.select;
  private readonly boundSelectDistinct: typeof this.db.selectDistinct;
  private readonly boundSelectDistinctOn: typeof this.db.selectDistinctOn;

  constructor(
    @unmanaged() protected readonly db: TSchema,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @unmanaged() protected readonly table: any
  ) {
    this.boundSelect = this.db.select.bind(this.db);
    this.boundSelectDistinct = this.db.selectDistinct.bind(this.db);
    this.boundSelectDistinctOn = this.db.selectDistinctOn.bind(this.db);
  }

  get qry() {
    return {
      select: this.boundSelect,
      selectDistinct: this.boundSelectDistinct,
      selectDistinctOn: this.boundSelectDistinctOn,
    };
  }

  async finMany(args?: Input) {
    const qry = this.qry.select(getTableColumns(this.table)).from(this.table);

    if (args) {
      const conditions = Object.entries(args)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => eq(this.table[key as keyof T], value));

      if (conditions.length > 0) {
        return qry.where(
          conditions.length === 1 ? conditions[0] : and(...conditions)
        ) as unknown as Promise<TModel[]>;
      }
    }

    return qry as unknown as Promise<TModel[]>;
  }

  async finOne(id: number) {
    const [result] = await this.qry
      .select(getTableColumns(this.table))
      .from(this.table)
      .where(eq(this.table.id, id));

    if (!result) {
      throw new Error(`Entity with id ${id} not found`);
    }

    return result as TModel;
  }

  async create(input: Input | Input[]) {
    const [result] = await this.db.insert(this.table).values(input).returning();

    if (!result) {
      throw new Error('Failed to create entity');
    }

    return result as TModel;
  }

  async update(
    id: number,
    input: Partial<Input> // Changed to InferInsertModel for better type consistency
  ) {
    const [result] = await this.db
      .update(this.table)
      .set(input)
      .where(eq(this.table.id, id))
      .returning();

    if (!result) {
      throw new Error(`Entity with id ${id} not found`);
    }

    return result as TModel;
  }

  async delete(id: number) {
    await this.db.delete(this.table).where(eq(this.table.id, id)).returning();
  }
}
