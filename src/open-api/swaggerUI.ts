import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export async function setupSwaggerUI(
  app: NestExpressApplication,
): Promise<void> {
  const config = new DocumentBuilder()
    .setTitle('Nest Blog')
    .setDescription(
      'Blog api created using nestjs ans cool stuff I like to use.',
    )
    .setVersion('v1')
    .addTag('blog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
