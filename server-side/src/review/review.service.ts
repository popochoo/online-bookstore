import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { ReviewDto } from './dto/review.dto'

@Injectable()
export class ReviewService {
	constructor(private prisma: PrismaService) {}

	async getById(id: string, userId: string) {
		const review = await this.prisma.review.findUnique({
			where: {
				id,
				userId
			},
			include: {
				user: true
			}
		})

		if (!review)
			throw new NotFoundException(
				'Отзыв не найден или вы не являетесь его владельцем'
			)

		return review
	}

	async getByBookId(bookId: string) {
		const reviews = await this.prisma.review.findMany({
			where: {
				bookId
			},
			include: {
				user: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

		if (!reviews)
			throw new NotFoundException('Отзывы не найдены или их нет')

		return reviews
	}

	async create(userId: string, bookId: string, dto: ReviewDto) {
		return this.prisma.review.create({
			data: {
				...dto,
				book: {
					connect: {
						id: bookId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		})
	}

	async delete(id: string, userId: string) {
		await this.getById(id, userId)

		return this.prisma.review.delete({
			where: {
				id
			}
		})
	}
}
