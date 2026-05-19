import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/client'
import { RequestWithUser } from '../interfaces/user.interface'

export const CurrentUser = createParamDecorator(
	(data: keyof User | undefined, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getResponse<RequestWithUser>()
		const user = request.user

		if (!user) return null

		return data ? user[data] : user
	}
)
