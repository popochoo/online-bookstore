import { useRouter } from 'next/navigation'

import styles from './HeaderCart.module.scss'
import { CartItem } from './cartItem/CartItem'
import { useCheckout } from './useCheckout'
import { Button } from '@/src/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/src/components/ui/sheet'
import { PUBLIC_URL } from '@/src/config/url.config'
import { useCart } from '@/src/hooks/queries/useCart'
import { useProfile } from '@/src/hooks/useProfile'
import { formatPrice } from '@/src/lib/utils'

export function HeaderCart() {
	const router = useRouter()

	const { createPayment, isLoadingCreate } = useCheckout()
	const { user } = useProfile()

	const { items, total } = useCart()

	const handleClick = () => {
		user ? createPayment() : router.push(PUBLIC_URL.auth())
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant={'ghost'}>Корзина</Button>
			</SheetTrigger>
			<SheetContent className={styles.cart}>
				<SheetHeader className='pt-2'>
					<SheetTitle className='text-xl font-bold text-slate-900 text-left pr-8 flex items-center h-6'>
						Корзина товаров
					</SheetTitle>
				</SheetHeader>
				<div className={styles.items}>
					{items.length ? (
						items.map(item => (
							<CartItem item={item} key={item.id} />
						))
					) : (
						<div className={styles.not_found}>Корзина пустая!</div>
					)}
				</div>
				{items.length ? (
					<>
						<div className={styles.total}>
							Итого к оплате: {formatPrice(total)}
						</div>
						<Button
							variant={'default'}
							onClick={handleClick}
							disabled={isLoadingCreate}
						>
							Перейти к оплате
						</Button>
					</>
				) : null}
			</SheetContent>
		</Sheet>
	)
}
