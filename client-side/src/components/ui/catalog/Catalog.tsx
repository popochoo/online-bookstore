import Link from 'next/link'

import styles from './Catalog.module.scss'
import { BookCard } from './bookCard/BookCard'
import { ICatalog } from './catalog.interface'

export function Catalog({
	title,
	description,
	linkTitle,
	link,
	books
}: ICatalog) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.info}>
					<h1>{title}</h1>
					{description && <p>{description}</p>}
				</div>
				{link && linkTitle && <Link href={link}>{linkTitle}</Link>}
			</div>

			<div className={styles.catalog}>
				<div className={styles.books}>
					{books.length ? (
						books.map(book => (
							<BookCard key={book.id} book={book} />
						))
					) : (
						<div>Ничего не найдено</div>
					)}
				</div>
			</div>
		</div>
	)
}
