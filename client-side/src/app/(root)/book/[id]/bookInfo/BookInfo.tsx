import Link from 'next/link'

import { AddToCartButton } from './AddToCartButton'
import styles from './BookInfo.module.scss'
import { FavoriteButton } from './FavoriteButton'
import { PUBLIC_URL } from '@/src/config/url.config'
import { formatPrice, getReviewWordWithEnding } from '@/src/lib/utils'
import { IBook } from '@/src/shared/types/book.interface'

interface BookInfoProps {
	book: IBook
}

export function BookInfo({ book }: BookInfoProps) {
	const rating =
		Math.round(
			book.reviews.reduce((acc, review) => acc + review.rating, 0) /
				book.reviews.length
		) || 0

	return (
		<div className={styles.book_info}>
			<h1 className={styles.title}>{book.title}</h1>
			<div className={styles.price}>{formatPrice(book.price)}</div>
			<hr />
			<p className={styles.description}>{book.description}</p>
			<hr />
			<div className={styles.label}>
				<h3>Категория: </h3>
				<Link
					className='text-sm'
					href={PUBLIC_URL.category(book.category.id)}
				>
					{book.category.title}
				</Link>
			</div>
			<div className={styles.label}>
				<h3>Средний рейтинг: </h3>
				<div className='text-sm'>
					{rating.toFixed(1)} | {''}
					{getReviewWordWithEnding(book.reviews.length)}
				</div>
			</div>
			<hr />
			<div className={styles.actions}>
				<AddToCartButton book={book} />
				<FavoriteButton book={book} />
			</div>
		</div>
	)
}
