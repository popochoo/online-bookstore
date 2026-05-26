'use client'

import { useQuery } from '@tanstack/react-query'

import styles from './Book.module.scss'
import { BookGallery } from './bookGallery/BookGallery'
import { BookInfo } from './bookInfo/BookInfo'
import { BookReviews } from './bookReviews/BookReviews'
import { Catalog } from '@/src/components/ui/catalog/Catalog'
import { bookService } from '@/src/services/book.service'
import { IBook } from '@/src/shared/types/book.interface'

interface BookProps {
	initialBook: IBook
	similarBooks: IBook[]
	id?: string
}

export function Book({ initialBook, similarBooks, id = '' }: BookProps) {
	const { data: book } = useQuery({
		queryKey: ['book', initialBook.id],
		queryFn: () => bookService.getById(id),
		initialData: initialBook,
		enabled: !!id
	})

	return (
		<div className={styles.book_page}>
			<div className={styles.content}>
				<div className={styles.blocks}>
					<BookGallery book={book} />
					<BookInfo book={book} />
				</div>
			</div>
			<Catalog title='Похожие товары' books={similarBooks} />
			<BookReviews book={book} />
		</div>
	)
}
