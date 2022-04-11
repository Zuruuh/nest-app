import {
  ValidateBy,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { IsUniqueValidator } from '../validators/IsUniqueValidator';
import { BaseEntity } from 'typeorm';

export const IS_UNIQUE = 'isUnique';

export function IsUnique<
  E extends typeof BaseEntity,
  F extends keyof InstanceType<E>,
>(
  entity: E,
  field: F,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_UNIQUE,
      constraints: [entity, field],
      validator: {
        validate: async (
          value: unknown,
          opts?: ValidationArguments,
        ): Promise<boolean> =>
          await IsUniqueValidator(
            value,
            opts.constraints[0],
            opts.constraints[1],
          ),
      },
      async: true,
    },
    validationOptions,
  );
}
