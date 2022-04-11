import { Post } from '../post.entity';
import { IsString, MaxLength } from 'class-validator';
import { i18nValidationMessage as i18n } from 'nestjs-i18n';

export class CreatePostDTO implements Partial<Post> {
  @IsString({ message: i18n('validation.string') })
  @MaxLength(Post.MAX_TITLE_LENGTH, {
    message: i18n('validation.max', { max: Post.MAX_TITLE_LENGTH }),
  })
  public title: string;

  @IsString({ message: i18n('validation.string') })
  public content: string;
}
