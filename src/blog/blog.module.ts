import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [BlogService],
  controllers: [BlogController],
  imports: [TypeOrmModule.forFeature([Post])],
})
export class BlogModule {}
