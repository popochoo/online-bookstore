'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { Catalog } from '@/src/components/ui/catalog/Catalog'
import { bookService } from '@/src/services/book.service'
import { IBook } from '@/src/shared/types/book.interface'

interface ExplorerProps {
	books: IBook[]
}

export function Explorer({ books }: ExplorerProps) {
	const searchParams = useSearchParams()

	const searchTerm = searchParams.get('searchTerm')

	const { data } = useQuery({
		queryKey: ['book explorer', searchTerm],
		queryFn: () => bookService.getAll(searchTerm),
		initialData: books
	})

	return (
		<div className='my-6'>
			<Catalog
				title={
					searchTerm
						? `Поиск по запросу "${searchTerm}"`
						: 'Каталог книг'
				}
				books={data}
			/>
		</div>
	)
}
