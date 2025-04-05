export interface IRepository<I, T> {
  finMany(args?: Partial<I>): Promise<T[]>;
  finOne(id: number): Promise<T>;
  create(input: I | I[]): Promise<T>;
  update(id: number, input: Partial<I>): Promise<T>;
  delete(id: number): Promise<void>;
}
