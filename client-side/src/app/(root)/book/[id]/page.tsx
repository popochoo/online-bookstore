import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Book } from './Book'
import { bookService } from '@/src/services/book.service'

export const revalidate = 60

interface BookPageProps {
	params: Promise<{ id: string }>
}

export async function generateStaticParams() {
	const books = await bookService.getAll()

	const paths = books.map(book => {
		return {
			params: { id: book.id }
		}
	})

	return paths
}

async function getBooks(id: string) {
	try {
		const book = await bookService.getById(id)

		const similarBooks = await bookService.getSimilar(id)

		return { book, similarBooks }
	} catch {
		return notFound()
	}
}

export async function generateMetadata({
	params
}: BookPageProps): Promise<Metadata> {
	const { book } = await getBooks((await params).id)

	return {
		title: book.title,
		description: book.description,
		openGraph: {
			images: [
				{
					url: book.images[0],
					width: 1000,
					height: 1000,
					alt: book.title
				}
			]
		}
	}
}

export default async function BookPage({ params }: BookPageProps) {
	const { book, similarBooks } = await getBooks((await params).id)

	return (
		<Book
			initialBook={book}
			similarBooks={similarBooks}
			id={(await params).id}
		/>
	)
}
