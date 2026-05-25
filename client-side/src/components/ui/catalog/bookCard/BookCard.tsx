import Image from 'next/image'
import Link from 'next/link'

import styles from './BookCard.module.scss'
import { PUBLIC_URL } from '@/src/config/url.config'
import { formatPrice } from '@/src/lib/utils'
import { IBook } from '@/src/shared/types/book.interface'

interface BookCardProps {
	book: IBook
}

export function BookCard({ book }: BookCardProps) {
	return (
		<div className={styles.card}>
			<Link href={PUBLIC_URL.book(book.id)}>
				<Image
					src={book.images[0]}
					alt={book.title}
					width={200}
					height={200}
				/>
			</Link>

			<h3 className={styles.title}>{book.title}</h3>
			<Link
				href={PUBLIC_URL.category(book.category.id)}
				className={styles.category}
			>
				{book.category.title}
			</Link>
			<p className={styles.price}>{formatPrice(book.price)}</p>
		</div>
	)
}
