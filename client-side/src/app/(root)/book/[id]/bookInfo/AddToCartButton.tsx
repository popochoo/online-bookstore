import { Button } from '@/src/components/ui/button'
import { useActions } from '@/src/hooks/queries/useActions'
import { useCart } from '@/src/hooks/queries/useCart'
import { IBook } from '@/src/shared/types/book.interface'

interface AddToCartButtonProps {
	book: IBook
}

export function AddToCartButton({ book }: AddToCartButtonProps) {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(cartItem => cartItem.book.id === book.id)

	return (
		<Button
			variant={'default'}
			size={'lg'}
			className='w-full'
			onClick={() =>
				currentElement
					? removeFromCart({ id: currentElement.id })
					: addToCart({ book, quantity: 1, price: book.price })
			}
		>
			{currentElement ? 'Удалить из корзины' : 'Добавить в корзину'}
		</Button>
	)
}
