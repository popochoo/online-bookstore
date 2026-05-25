import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { BookService } from './book.service'
import { Auth } from 'src/auth/decorators/auth.decorate'
import { BookDto } from './dto/book.dto'

@Controller('books')
export class BookController {
	constructor(private readonly bookService: BookService) {}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.bookService.getAll(searchTerm)
	}

	@Get('by-id/:id')
	async getById(@Param('id') id: string) {
		return this.bookService.getById(id)
	}

	@Get('by-category/:categoryId')
	async getByCategory(@Param('categoryId') categoryId: string) {
		return this.bookService.getByCategory(categoryId)
	}

	@Get('most-popular')
	async getMostPopular() {
		return this.bookService.getMostPopular()
	}

	@Get('similar/:id')
	async getSimilar(@Param('id') id: string) {
		return this.bookService.getSimilar(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@Body() dto: BookDto) {
		return this.bookService.create(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(@Param('id') id: string, @Body() dto: BookDto) {
		return this.bookService.update(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.bookService.delete(id)
	}
}
