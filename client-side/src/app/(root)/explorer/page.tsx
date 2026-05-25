import type { Metadata } from 'next'

import { Explorer } from './Explorer'
import { bookService } from '@/src/services/book.service'

export const metadata: Metadata = {
	title: 'Каталог книг'
}

export const revalidate = 60

async function getBooks() {
	const data = await bookService.getAll()

	return data
}

export default async function ExplorerPage() {
	const data = await getBooks()

	return <Explorer books={data} />
}
