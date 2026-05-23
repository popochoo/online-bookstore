import type { Metadata } from 'next'

import { Home } from './Home'
import { bookService } from '@/src/services/book.service'

export const metadata: Metadata = {
	title: 'BookStore — Купить книги онлайн: от бестселлеров до классики'
}

export const revialdate = 60

async function getBooks() {
	const data = (await bookService.getMostPopular()).slice(0, 4)

	return data
}

export default async function HomePage() {
	const data = await getBooks()

	return <Home books={data} />
}
