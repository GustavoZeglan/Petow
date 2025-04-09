import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Swagger } from '@architecture/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { Response } from 'express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'warn', 'debug', 'error'],
  })

  app.useStaticAssets(join(__dirname, '..', 'public'))

  const expressApp = app.getHttpAdapter().getInstance()
  expressApp.get('/', (req, res: Response) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'))
  })

  // Swagger.setup(app)
  // Swagger.setAlternativeRoutes(app)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
