import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { BookDto } from './dto/book.dto'

@Injectable()
export class BookService {
	constructor(private prisma: PrismaService) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.getSearchTermFilter(searchTerm)

		const books = await this.prisma.book.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				category: true,
				reviews: true
			}
		})

		return books
	}

	private getSearchTermFilter(searchTerm: string) {
		return this.prisma.book.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						},
						description: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			}
		})
	}

	async getById(id: string) {
		const book = await this.prisma.book.findUnique({
			where: {
				id
			},
			include: {
				category: true,
				reviews: true
			}
		})

		if (!book) throw new NotFoundException('Книга не найдена')

		return book
	}

	async getByCategory(categoryId: string) {
		const books = await this.prisma.book.findMany({
			where: {
				category: {
					id: categoryId
				}
			},
			include: {
				category: true
			}
		})

		if (!books) throw new NotFoundException('Книги не найдена')

		return books
	}

	async getMostPopular() {
		const mostPopularBook = await this.prisma.orderItem.groupBy({
			by: ['bookId'],
			_count: {
				bookId: true
			},
			orderBy: {
				_count: {
					bookId: 'desc'
				}
			}
		})

		const bookIds = mostPopularBook.map(item => item.bookId as string)

		const books = await this.prisma.book.findMany({
			where: {
				id: {
					in: bookIds
				}
			},
			include: {
				category: true
			}
		})

		return books
	}

	async getSimilar(id: string) {
		const currentBook = await this.getById(id)

		if (!currentBook)
			throw new NotFoundException('Текущая книга не найдена')

		const books = await this.prisma.book.findMany({
			where: {
				category: {
					title: currentBook.category?.title
				},
				NOT: {
					id: currentBook.id
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				category: true
			}
		})

		return books
	}

	async create(dto: BookDto) {
		return this.prisma.book.create({
			data: {
				title: dto.title,
				description: dto.description,
				price: dto.price,
				images: dto.images,
				categoryId: dto.categoryId
			}
		})
	}

	async update(id: string, dto: BookDto) {
		await this.getById(id)

		return this.prisma.book.update({
			where: {
				id
			},
			data: dto
		})
	}

	async delete(id: string) {
		await this.getById(id)

		return this.prisma.book.delete({
			where: {
				id
			}
		})
	}
}
