import { Hero } from './hero/Hero'
import { Catalog } from '@/src/components/ui/catalog/Catalog'
import { PUBLIC_URL } from '@/src/config/url.config'
import { IBook } from '@/src/shared/types/book.interface'

interface HomeProps {
	books: IBook[]
}

export function Home({ books }: HomeProps) {
	return (
		<>
			<Hero />
			<Catalog
				title='Хиты продаж'
				description='Самые попурядрные книги нашего магазина.'
				linkTitle='Узнать больше'
				link={PUBLIC_URL.explorer()}
				books={books}
			/>
		</>
	)
}
