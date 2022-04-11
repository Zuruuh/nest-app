import { IsString } from 'class-validator';
import { i18nValidationMessage as i18n } from 'nestjs-i18n';

export class LoginDTO {
  @IsString({ message: i18n('validation.string') })
  public usernameOrEmail: string;
  @IsString({ message: i18n('validation.string') })
  public password: string;
}
