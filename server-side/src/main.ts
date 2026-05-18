import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.use(cookieParser())
	app.enableCors({
		origin: [process.env.CLIENT_URL],
		credentials: true,
		epxosedHeaders: ['set-cookie']
	})

	await app.listen(5000)
}
bootstrap().catch(err => {
	console.error('Application failed to start:', err)
	process.exit(1)
})
