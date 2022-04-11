import { Injectable, HttpException, Inject } from '@nestjs/common';
import { Post } from './post.entity';
import { CreatePostDTO } from './dto/createPostDTO';
import { User } from '../user/user.entity';
import { instanceToPlain } from 'class-transformer';
import { PaginationOptions } from '../paging/paging-options.decorator';
import { getI18nContextFromRequest, I18nContext } from 'nestjs-i18n';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class BlogService {
  private readonly i18n: I18nContext;
  public constructor(@Inject(REQUEST) private readonly request: Request) {
    this.i18n = getI18nContextFromRequest(request);
  }
  public async getCount(): Promise<number> {
    return await Post.createQueryBuilder('p').select('p.id').getCount();
  }

  public async get(id: number): Promise<Partial<Post> | null> {
    const post = await this.findOrThrow(() =>
      Post.createQueryBuilder('p')
        .innerJoin('p.author', 'a')
        .addSelect('a.id')
        .where('p.id = :id', { id })
        .getOne(),
    );

    return instanceToPlain<Post>(post, {
      groups: ['show'],
    });
  }

  public async findOrThrow<T>(callback: () => Promise<T>): Promise<T> {
    const data = await callback();
    if (!data) throw new HttpException(this.i18n.t('exceptions.404.post'), 404);

    return data;
  }

  public async create(data: CreatePostDTO, author: User): Promise<Post> {
    const post = new Post({ ...data, author });
    await post.save();

    return instanceToPlain(post, { groups: ['show'] }) as Post;
  }

  public async list(options: PaginationOptions): Promise<Post[]> {
    return await Post.createQueryBuilder('c')
      .skip(options.offset)
      .take(options.limit)
      .getMany();
  }
}
