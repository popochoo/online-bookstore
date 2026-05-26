import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Heart } from 'lucide-react'

import { Button } from '@/src/components/ui/button'
import { useProfile } from '@/src/hooks/useProfile'
import { userService } from '@/src/services/user.service'
import { IBook } from '@/src/shared/types/book.interface'
import { IUser } from '@/src/shared/types/user.interface'

// Убедитесь, что импортировали тип пользователя

interface FavoriteButtonProps {
	book: IBook
}

export function FavoriteButton({ book }: FavoriteButtonProps) {
	const { user } = useProfile()
	const queryClient = useQueryClient()

	const isExists =
		user?.favorites?.some(favorite => favorite.id === book.id) ?? false

	const { mutate, isPending } = useMutation({
		mutationKey: ['toggle favorite', book.id],
		mutationFn: () => userService.toggleFavorite(book.id),

		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['profile'] })

			const previousProfile = queryClient.getQueryData<IUser>(['profile'])

			// Типизируем `old` как IUser или undefined вместо any
			queryClient.setQueryData<IUser>(['profile'], old => {
				if (!old) return old

				const currentFavorites = old.favorites || []
				const alreadyExists = currentFavorites.some(
					f => f.id === book.id
				)

				return {
					...old,
					favorites: alreadyExists
						? currentFavorites.filter(f => f.id !== book.id)
						: [...currentFavorites, book]
				}
			})

			return { previousProfile }
		},

		onError: (err, variables, context) => {
			if (context?.previousProfile) {
				queryClient.setQueryData(['profile'], context.previousProfile)
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['profile'] })
		}
	})

	if (!user) return null

	return (
		<Button
			variant={'secondary'}
			size={'icon'}
			onClick={() => mutate()}
			disabled={isPending}
		>
			{isExists ? (
				<Heart fill='#F43F5E' stroke='#F43F5E' className='size-5' />
			) : (
				<Heart className='size-5' />
			)}
		</Button>
	)
}
