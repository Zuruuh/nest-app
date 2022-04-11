import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
import { IsMatchingRegex } from 'src/utils/constraints/IsMatchingRegexConstraint';
import { IsUnique } from 'src/utils/constraints/isUniqueConstraint';
import { User } from '../../user/user.entity';
import { i18nValidationMessage as i18n } from 'nestjs-i18n';

const {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} = User;

export class RegistrationDTO implements Partial<User> {
  @IsString({ message: i18n('validation.string') })
  @MaxLength(MAX_USERNAME_LENGTH, {
    message: i18n('validation.max', {
      max: MAX_USERNAME_LENGTH,
    }),
  })
  @MinLength(MIN_USERNAME_LENGTH, {
    message: i18n('validation.min', {
      min: MIN_USERNAME_LENGTH,
    }),
  })
  @IsUnique(User, 'username', { message: i18n('validation.username.taken') })
  @IsMatchingRegex(/^[A-Za-z]+$/g, {
    message: i18n('validation.username.invalid'),
  })
  public username: string;

  @IsEmail({ message: i18n('validation.mail') })
  @IsUnique(User, 'email', { message: i18n('validation.email.in_use') })
  public email: string;

  @MaxLength(MAX_PASSWORD_LENGTH, {
    message: i18n('validation.max', {
      max: MAX_PASSWORD_LENGTH,
    }),
  })
  @MinLength(MIN_PASSWORD_LENGTH, {
    message: i18n('validation.min', {
      min: MIN_PASSWORD_LENGTH,
    }),
  })
  @IsString({ message: i18n('validation.string') })
  public password: string;
}
