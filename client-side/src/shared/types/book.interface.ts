import { ICategory } from './category.interface'
import { IReview } from './review.interface'

export interface IBook {
	id: string
	title: string
	description: string
	price: number
	images: string[]
	category: ICategory
	reviews: IReview[]
}

export interface IBookInput extends Omit<
	IBook,
	'id' | 'reviews' | 'category'
> {
	categoryId: string
}
