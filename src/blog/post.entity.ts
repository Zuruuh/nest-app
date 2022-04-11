import { Expose, Transform } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Expose({ groups: ['show'] })
  public id: number;

  @Column({ length: Post.MAX_TITLE_LENGTH, type: 'varchar' })
  @Expose({ groups: ['show'] })
  public title: string;
  public static MAX_TITLE_LENGTH = 128;

  @Column({ type: 'text' })
  @Expose({ groups: ['show'] })
  public content: string;

  @ManyToOne(() => User, (author: User) => author.posts)
  @Transform(({ value }: { value: User }) => value.id, { groups: ['show'] })
  public author: User;

  public constructor(data?: Partial<Post>) {
    super();
    Object.assign(this, data ?? {});
  }
}
