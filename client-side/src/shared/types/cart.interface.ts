import { IBook } from './book.interface'

export interface ICartItem {
	id: number
	book: IBook
	quantity: number
	price: number
}
