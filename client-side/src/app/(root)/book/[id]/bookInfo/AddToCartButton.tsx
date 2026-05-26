import { Button } from '@/src/components/ui/button'
import { IBook } from '@/src/shared/types/book.interface'

interface AddToCartButtonProps {
	book: IBook
}

export function AddToCartButton({ book }: AddToCartButtonProps) {
	return (
		<Button variant={'default'} size={'lg'} className='w-full'>
			Добавить в корзину
		</Button>
	)
}
