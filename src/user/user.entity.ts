import { Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../blog/post.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  @Expose({ groups: ['self', 'public'] })
  public id: number;

  @Expose({ groups: ['self', 'public'] })
  @Column({ length: User.MAX_USERNAME_LENGTH, unique: true })
  public username!: string;
  public static MIN_USERNAME_LENGTH = 4;
  public static MAX_USERNAME_LENGTH = 32;

  @Expose({ groups: ['self'] })
  @Column({ unique: true })
  public email!: string;

  @Exclude({ toPlainOnly: true })
  @Column({ length: User.MAX_PASSWORD_LENGTH })
  public password!: string;
  public static MAX_PASSWORD_LENGTH = 4096;
  public static MIN_PASSWORD_LENGTH = 4;

  @Column()
  @Exclude({ toPlainOnly: true })
  public salt!: string;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[];

  public constructor(data?: Partial<User>) {
    super();
    Object.assign(this, data ?? {});
  }
}
