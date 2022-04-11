import { IsMatchingRegexValidator } from '../validators/IsMatchingRegexValidator';
import { ValidationOptions, ValidateBy } from 'class-validator';

export const IS_MATCHING_REGEX = 'isMatchingRegex';

export function IsMatchingRegex(
  regex: RegExp,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_MATCHING_REGEX,
      constraints: [regex],
      validator: {
        validate: (value: unknown): boolean =>
          IsMatchingRegexValidator(value, regex),
      },
      async: false,
    },
    validationOptions,
  );
}
