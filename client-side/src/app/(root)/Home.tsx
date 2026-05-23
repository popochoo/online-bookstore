import { Hero } from './hero/Hero'
import { IBook } from '@/src/shared/types/book.interface'

interface HomeProps {
	books: IBook[]
}

export function Home({ books }: HomeProps) {
	return (
		<>
			<Hero />
		</>
	)
}
