import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import {
  PagingOptions,
  PaginationOptions,
} from '../paging/paging-options.decorator';
import { CreatePostDTO } from './dto/createPostDTO';
import { Request } from 'express';

@Controller('/blog')
export class BlogController {
  public constructor(private readonly blogService: BlogService) {}

  @Get('/posts')
  public async latestPosts(@PagingOptions() paging: PaginationOptions) {
    const count = await this.blogService.getCount();
    const data = await this.blogService.list(paging);

    return { count, data };
  }

  @Get('/posts/:id')
  public async getPost(@Param('id', ParseIntPipe) id: number) {
    return await this.blogService.get(id);
  }

  @Post('/posts')
  public async createPost(@Body() data: CreatePostDTO, @Req() req: Request) {
    return await this.blogService.create(data, req.user);
  }
}
