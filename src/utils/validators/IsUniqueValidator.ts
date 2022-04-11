import { FindOptionsWhere, BaseEntity } from 'typeorm';

export async function IsUniqueValidator<
  E extends typeof BaseEntity,
  F extends keyof InstanceType<E>,
>(value: unknown, entity: E, field: F): Promise<boolean> {
  const conditions: FindOptionsWhere<InstanceType<E>> = {};
  conditions[field] = value as any;
  const exists = await entity.findOneBy(conditions);

  return !exists;
}
