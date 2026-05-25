import { Metadata } from 'next'

import { Catalog } from '@/src/components/ui/catalog/Catalog'
import { bookService } from '@/src/services/book.service'
import { categoryService } from '@/src/services/category.service'

export const revalidate = 60

interface CategoryPageProps {
	params: Promise<{ id: string }>
}

async function getBooks(id: string) {
	console.log('ЗАПРОШЕННЫЙ ID КАТЕГОРИИ:', id)
	const books = await bookService.getByCategory(id)

	const category = await categoryService.getById(id)

	return { books, category }
}

export async function generateMetadata({
	params
}: CategoryPageProps): Promise<Metadata> {
	const { books, category } = await getBooks((await params).id)

	return {
		title: category.title,
		description: category.description,
		openGraph: {
			images: [
				{
					url: books[0].images[0],
					width: 1000,
					height: 1000,
					alt: category.title
				}
			]
		}
	}
}

export default async function CategoryPage({ params }: CategoryPageProps) {
	const { books, category } = await getBooks((await params).id)

	return (
		<div className='my-6'>
			<Catalog
				title={category.title}
				description={category.description}
				books={books}
			/>
		</div>
	)
}
