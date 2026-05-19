import { Controller, Get, Param, Patch, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorate'
import { CurrentUser } from './decorators/user.decorator'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Auth()
	@Get('profile')
	async getProfile(@Req() req: any, @CurrentUser('id') id: string) {
		return this.userService.getById(id)
	}

	@Auth()
	@Patch('profile/favorites/:bookId')
	async toggleFavorit(
		@CurrentUser('id') userId: string,
		@Param('bookId') bookId: string
	) {
		return this.userService.toggleFavorite(bookId, userId)
	}
}
