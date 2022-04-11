export const IsMatchingRegexValidator = (
  value: unknown,
  regex: RegExp,
): boolean => typeof value === 'string' && regex.test(value);
