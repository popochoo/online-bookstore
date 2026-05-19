import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { Auth } from 'src/auth/decorators/auth.decorate'
import { ReviewDto } from './dto/review.dto'
import { CurrentUser } from 'src/user/decorators/user.decorator'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Get('by-bookId/:bookId')
	async getByBookId(@Param('bookId') bookId: string) {
		return this.reviewService.getByBookId(bookId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post(':bookId')
	async create(
		@CurrentUser('id') userId: string,
		@Param('bookId') bookId: string,
		@Body() dto: ReviewDto
	) {
		return this.reviewService.create(userId, bookId, dto)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.reviewService.delete(id, userId)
	}
}
