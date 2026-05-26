import { NestFactory } from '@nestjs/core'
import { faker } from '@faker-js/faker'
import { Category, Book, User, Prisma } from '@prisma/client'
import { AppModule } from '../src/app.module'
import { PrismaService } from '../src/prisma.service'

async function main() {
	console.log('Инициализация контекста NestJS...')
	const app = await NestFactory.createApplicationContext(AppModule)
	const prisma = app.get(PrismaService)

	try {
		console.log('Очистка старых данных...')
		await prisma.review.deleteMany()
		await prisma.book.deleteMany()
		await prisma.category.deleteMany()
		await prisma.user.deleteMany()

		console.log('Генерация пользователей...')
		const usersData = Array.from({ length: 10 }).map(() => ({
			name: faker.person.fullName(),
			email: faker.internet.email(),
			password: 'hashed_password_here',
			picture: faker.image.avatar()
		}))

		const createdUsers: User[] = []
		for (const userData of usersData) {
			const user = await prisma.user.create({ data: userData })
			createdUsers.push(user)
		}
		console.log(`Создано пользователей: ${createdUsers.length}`)

		console.log('Генерация категорий...')
		const CATEGORIES_LIST = [
			{ title: 'Художественная литература', description: 'fiction' },
			{ title: 'Бизнес и экономика', description: 'business' },
			{ title: 'Психология и саморазвитие', description: 'psychology' },
			{ title: 'Наука и технологии', description: 'science' },
			{ title: 'Детские книги', description: 'children' },
			{ title: 'История и биография', description: 'history' }
		]

		const createdCategories: Category[] = []
		for (const cat of CATEGORIES_LIST) {
			const category = await prisma.category.create({
				data: { title: cat.title, description: cat.description }
			})
			createdCategories.push(category)
		}

		console.log('Генерация книг...')
		const booksData = Array.from({ length: 50 }).map(() => {
			const randomCategory = faker.helpers.arrayElement(createdCategories)
			return {
				title: faker.commerce.productName(),
				description: faker.commerce.productDescription(),
				price: faker.number.int({ min: 300, max: 3000 }),
				images: [
					'/uploads/book-example-image1.png',
					'/uploads/book-example-image2.png',
					'/uploads/book-example-image3.png'
				],
				categoryId: randomCategory.id
			}
		})

		const createdBooks: Book[] = []
		for (const bookData of booksData) {
			const book = await prisma.book.create({ data: bookData })
			createdBooks.push(book)
		}
		console.log(`Создано книг: ${createdBooks.length}`)

		console.log('Генерация случайных отзывов...')

		const reviewsData: Prisma.ReviewCreateManyInput[] = []

		for (const book of createdBooks) {
			const reviewsCount = faker.number.int({ min: 1, max: 4 })

			for (let i = 0; i < reviewsCount; i++) {
				const randomUser = faker.helpers.arrayElement(createdUsers)

				reviewsData.push({
					rating: faker.number.int({ min: 3, max: 5 }),
					text: faker.lorem.paragraph(),
					bookId: book.id,
					userId: randomUser.id
				})
			}
		}

		const createdReviews = await prisma.review.createMany({
			data: reviewsData
		})
		console.log(`Успешно добавлено отзывов: ${createdReviews.count}`)
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Ошибка во время сидирования:', error.message)
		} else {
			console.error('Неизвестная ошибка во время сидирования:', error)
		}
	} finally {
		await app.close()
		console.log('Сидирование завершено.')
	}
}

main()
