import Image from 'next/image'
import Link from 'next/link'

import styles from '../HeaderCart.module.scss'

import { CartActions } from './CartActions'
import { PUBLIC_URL } from '@/src/config/url.config'
import { formatPrice } from '@/src/lib/utils'
import { ICartItem } from '@/src/shared/types/cart.interface'

interface CartItemProps {
	item: ICartItem
}

export function CartItem({ item }: CartItemProps) {
	return (
		<div className={styles.item}>
			<Link href={PUBLIC_URL.book(item.book.id)} className={styles.image}>
				<Image src={item.book.images[0]} alt={item.book.title} fill />
			</Link>
			<div className={styles.right}>
				<h2>{item.book.title}</h2>
				<p>{formatPrice(item.book.price)}</p>
				<CartActions item={item} />
			</div>
		</div>
	)
}
